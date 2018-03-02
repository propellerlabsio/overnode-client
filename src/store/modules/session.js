/* Can't use vuex mutations with these airbnb rules:                     */
/* eslint-disable no-param-reassign                                      */

import axios from 'axios';
import jwt from 'jwt-client';

// Session status values
const sessionStatuses = {
  NONE: Symbol('No session. User should log in.'),
  EXPIRED: Symbol('User\'s access token has expired. User should log back in.'),
  READY: Symbol('Session is ready'),
};

// Axios config
const config = {
  validateStatus(httpCode) {
    // Accept HTTP 200 to 500 Return codes
    return httpCode >= 200 && httpCode <= 500;
  },
};

const initialState = {
  // Current session status
  status: sessionStatuses.NONE,

  // Human friendly status message
  statusMessage: '',

  // Access token that has been issued by the server
  accessToken: '',

  // Token was issued with admin rights
  hasAdmin: false,

  // Date/time token expires
  tokenExpires: null,
};

const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    if (accessToken) {
      const jwtToken = jwt.read(accessToken);
      state.hasAdmin = jwtToken.claim.permissions.includes('admin');
      state.tokenExpires = new Date(jwtToken.claim.exp * 1000);
    } else {
      state.hasAdmin = false;
      state.tokenExpires = null;
    }
  },
  setStatus(state, newStatus) {
    state.status = newStatus;
  },
};

const actions = {
  /**
   * Call to initialize a session.
   *
   * @param {any} { commit, state }
   */
  async start({ commit, dispatch }, accessToken) {
    if (!accessToken) {
      // No token provided
      throw new Error('No access token');
    } else {
      commit('setAccessToken', accessToken);
      if ((Storage) !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
      }
    }

    await Promise.all([
      dispatch('coins/load', {}, { root: true }),
      dispatch('trades/load', {}, { root: true }),
      dispatch('strategies/load', {}, { root: true }),
    ]);

    commit('setStatus', sessionStatuses.READY);
  },

  end({ commit }) {
    commit('setAccessToken', null);
    if ((Storage) !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
    commit('setStatus', sessionStatuses.NONE);
  },

  /**
   * Returns access token.
   *
   * If no access token is in the store, an attempt will be made to load one
   * from local storage.
   */
  getAccessToken({ commit, state }) {
    // TODO - validate token expiry from token data, throw errors etc
    let token = state.accessToken;
    if (!token && (Storage) !== 'undefined') {
      token = localStorage.getItem('accessToken');
      commit('setAccessToken', token);
    }
    return token;
  },

  request(vuexUnused, { query, variables }) {
    return new Promise((resolve, reject) => {
      // Request payload: query + arguments (variables)
      const payload = {
        query,
        variables,
      };

      return axios.post('/graphql', payload, config)
        .then((response) => {
          if (response.data.errors) {
            const serverMessage = response.data.errors[0].message;
            reject(new Error(`Server returned error: ${serverMessage}`));
          } else {
            resolve(response.data.data);
          }
        })
        .catch((err) => {
          // Humanize error messages for known error conditions
          if (err.message.includes('504')) {
            reject(new Error('Unable to connect to the server.  Please try again later.'));
          } else {
            reject(err);
          }
        });
    });
  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};

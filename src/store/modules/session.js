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

const getters = {
  statuses() {
    return sessionStatuses;
  },
  email(state) {
    let email = null;
    if (state.accessToken) {
      const jwtToken = jwt.read(state.accessToken);
      email = jwtToken.claim.sub;
    }
    return email;
  },
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
   * Attempt to restore session (if any) from local storage
   */
  async restore({ dispatch }) {
    if ((Storage) !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        // Have stored token, check it hasn't expired
        const jwtToken = jwt.read(accessToken);
        const tokenExpires = new Date(jwtToken.claim.exp * 1000);
        const now = new Date();
        if (tokenExpires > now) {
          // Start session with stored token, keep it for future sessions
          dispatch('start', { accessToken, keep: true });
        }
      }
    }
  },

  /**
   * Call to initialize a session.
   *
   * @param {any} { commit, state }
   */
  async start({ commit }, { accessToken, keep }) {
    if (!accessToken) {
      // No token provided
      throw new Error('No access token');
    } else {
      commit('setAccessToken', accessToken);
      if ((Storage) !== 'undefined' && keep) {
        localStorage.setItem('accessToken', accessToken);
      }
    }

    commit('setStatus', sessionStatuses.READY);
  },

  end({ commit }) {
    commit('setAccessToken', null);
    if ((Storage) !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
    commit('setStatus', sessionStatuses.NONE);
  },

  request({ state }, { query, variables }) {
    return new Promise((resolve, reject) => {
      // Request payload: query + arguments (variables)
      const payload = {
        query,
        variables,
      };

      config.headers = {
        Authorization: `bearer ${state.accessToken}`,
      };

      return axios.post('/graphql', payload, config)
        .then((response) => {
          if (response.data.errors) {
            const serverMessage = response.data.errors[0].message;
            reject(new Error(`Error: ${serverMessage}`));
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
  getters,
  mutations,
  actions,
};

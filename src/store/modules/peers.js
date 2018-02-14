/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */
import Vue from 'vue';
import * as d3 from 'd3';

const color = d3.scaleOrdinal(d3.schemeCategory20);

const state = {
  all: [],
  colors: {
    Unknown: color(1),
    ABC: color(2),
    BUCash: color(3),
    XT: color(4),
  },
};

function getClientInfo(state, nodeSubversion) {
  let clientColor;
  let software;
  if (!nodeSubversion) {
    clientColor = state.colors.Unknown;
    software = 'Unknown client';
  } else if (nodeSubversion.includes('BUCash')) {
    clientColor = state.colors.BUCash;
    software = 'Bitcoin Unlimited';
  } else if (nodeSubversion.includes('ABC')) {
    clientColor = state.colors.ABC;
    software = 'Bitcoin ABC';
  } else if (nodeSubversion.includes('XT')) {
    clientColor = state.colors.XT;
    software = 'Bitcoin XT';
  } else {
    clientColor = state.colors.Unknown;
    software = nodeSubversion;
  }
  return { clientColor, software };
}


const mutations = {
  setAll(state, peers) {
    state.all = peers
      .map((node) => {
        const { clientColor, software } = getClientInfo(state, node.subver);
        const title = node.location && node.location.country ?
          `${software}; ${node.location.city} ${node.location.country_code}` :
          `${software}; ${node.addr.split(':')[0]}`;
        return Object.assign({
          color: clientColor,
          software,
          title,
          changed: {},
        }, node);
      });
  },
  updateValues(state, peers) {
    state.all.forEach((existing) => {
      // Find new values in array provided
      const newValues = peers.find(peer => peer.id === existing.id);
      if (newValues) {
        // Vue.set(state.all, index, merged);
        Vue.set(existing.changed, 'bytesrecv', existing.bytesrecv !== newValues.bytesrecv);
        Vue.set(existing.changed, 'bytessent', existing.bytessent !== newValues.bytessent);
        Vue.set(existing.changed, 'pingtime', existing.pingtime !== newValues.pinttime);
        Vue.set(existing, 'bytesrecv', newValues.bytesrecv);
        Vue.set(existing, 'bytessent', newValues.bytessent);
        Vue.set(existing, 'pingtime', newValues.pingtime);
      }
    });
  },
};

const actions = {
  async getAll({ dispatch, commit }) {
    const query = `query {
      peers {
        id
        addr
        bytessent
        bytesrecv
        pingtime
        subver
        inbound
        location {
          country
          country_code
          region
          region_name
          city
          lat
          lon
        }        
      }
    }`;

    const variables = {
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('setAll', response.peers);
  },
  /**
   * Uses lighter wieght query just to update bytes sent/received and ping time.
   */
  async updateValues({ dispatch, commit }) {
    const query = `query {
      peers {
        id
        bytessent
        bytesrecv
        pingtime
      }
    }`;

    const variables = {
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('updateValues', response.peers);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

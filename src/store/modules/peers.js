/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */
import Vue from 'vue';
import * as d3 from 'd3';

const color = d3.scaleOrdinal(d3.schemeCategory20);

const state = {
  all: [],
  selected: {},
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
  setSelected(state, peer) {
    Vue.set(state, 'selected', peer);
  },

  /**
   * Update bytessent bytesrecv values from an array of peers and flag
   * time it was updated.  This is to allow visual elements to
   * highlight tx/rx
   * @param {*} state - Vuex state object
   * @param {Object[]} peers - Peers that might have changed data values.
   * @param {string} peers[].bytesrecv - The new bytesrecv value.
   * @param {string} peers[].bytessent - The new bytessent value.
   */
  updateDataValues(state, peers) {
    state.all.forEach((existing) => {
      // Find new values in array provided
      const newValues = peers.find(peer => peer.id === existing.id);
      if (newValues) {
        const receivedChanged = newValues.bytesrecv && existing.bytesrecv !== newValues.bytesrecv;
        const sentChanged = newValues.bytessent && existing.bytessent !== newValues.bytessent;
        Vue.set(existing.changed, 'bytesrecv', receivedChanged);
        Vue.set(existing.changed, 'bytessent', sentChanged);
        if (receivedChanged) {
          Vue.set(existing, 'bytesrecv', newValues.bytesrecv);
        }
        if (sentChanged) {
          Vue.set(existing, 'bytessent', newValues.bytessent);
        }
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
  async setSelected({ commit, dispatch }, peerId) {
    // Clear the previous selection in the store
    commit('setSelected', null);

    const query = `query($peerId: Int!) {
      peer(id: $peerId) {
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
          as
        }        
      }
    }`;

    const variables = {
      peerId,
    };

    // Execute query and set data in store
    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('setSelected', response.peer);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

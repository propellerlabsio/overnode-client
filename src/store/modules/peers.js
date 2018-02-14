/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */
import Vue from 'vue';
import * as d3 from 'd3';

const color = d3.scaleOrdinal(d3.schemeCategory20);

const state = {
  all: [],
  selected: {},
  txrx: [], // Cutdown and modified copy of peers for reactive UI updates
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
      .map((peer) => {
        const { clientColor, software } = getClientInfo(state, peer.subver);
        const title = peer.location && peer.location.country ?
          `${software}; ${peer.location.city} ${peer.location.country_code}` :
          `${software}; ${peer.addr.split(':')[0]}`;
        return {
          id: peer.id,
          addr: peer.addr,
          // bytessent: peer.bytessent, // do not store here
          // bytesrecv: peer.bytesrecv, // store in txrx instead
          pingtime: peer.pingtime,
          subver: peer.subver,
          inbound: peer.inboud,
          location: peer.location,
          color: clientColor,
          software,
          title,
          changed: {},
        };
      });
  },

  setSelected(state, peer) {
    Vue.set(state, 'selected', peer);
  },

  /**
   * Update bytessent bytesrecv values from an array of peers.  This is to allow
   * visual elements to highlight tx/rx
   * @param {*} state - Vuex state object
   * @param {Object[]} peers - Peers that might have changed data values.
   * @param {string} peers[].bytesrecv - The new bytesrecv value.
   * @param {string} peers[].bytessent - The new bytessent value.
   */
  updateTxRx(state, peers) {
    peers.forEach((newValues) => {
      // Find existing txrx values
      const existingValues = state.txrx.find(peer => newValues.id === peer.id);
      if (!existingValues) {
        // No existing record - create new one
        state.txrx.push({
          id: newValues.id,
          bytesrecv: newValues.bytesrecv,
          bytessent: newValues.bytessent,
          rx: newValues.bytesrecv !== undefined,
          tx: newValues.bytessent !== undefined,
        });
      } else {
        // Update bytes recieved
        if (newValues.bytesrecv !== undefined && newValues.bytesrecv !== existingValues.bytesrecv) {
          Vue.set(existingValues, 'bytesrecv', newValues.bytesrecv);
          Vue.set(existingValues, 'rx', true);
        } else {
          Vue.set(existingValues, 'rx', false);
        }

        // Update bytes sent
        if (newValues.bytessent !== undefined && newValues.bytessent !== existingValues.bytessent) {
          Vue.set(existingValues, 'bytessent', newValues.bytessent);
          Vue.set(existingValues, 'tx', true);
        } else {
          Vue.set(existingValues, 'tx', false);
        }
      }
    });
  },
};

const getters = {
  selected(state) {
    if (!state.selected) {
      return null;
    }

    // Merge data from all and txrx to get
    // reactive flag that bytes sent/recd has changed
    const selected = state.selected;
    const txrx = state.txrx.find(candidate => candidate.id === selected.id);

    // Return merged
    return Object.assign({}, selected, txrx);
  },
  peers(state) {
    // Merge data from all and txrx to get
    // reactive flag that bytes sent/recd has changed
    const all = state.all;
    const txrx = state.txrx;

    // Return merged
    return all.map((peer) => {
      const toMerge = txrx.find(candidate => candidate.id === peer.id);
      return Object.assign({}, peer, toMerge);
    });
  },
};

const actions = {
  async getAll({ dispatch, commit }) {
    // Note: changes to this query need to be reflected in
    // mutation setAll to be effective
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
    commit('updateTxRx', response.peers);
  },
  async setSelected({ commit, dispatch }, peerId) {
    // Clear the previous selection in the store
    commit('setSelected', null);

    const query = `query($peerId: Int!) {
      peer(id: $peerId) {
        id
        addr
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
  getters,
  mutations,
  actions,
};

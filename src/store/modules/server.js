/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */
import Vue from 'vue';

const state = {
  host: {
    hostname: '',
    platform: '',
    cpus: [],
    totalmem: 0,
    donation_address: '',
    overnode_version: '',
  },
  node: {
    fork: '',
    status: '',
    testnet: null,
  },
  status: {
    jobsInErrorCount: 0,
    height: {
      bitcoind: 0,
      overnode: 0,
      peers: 0,
    },
    mempool: {
      txCount: 0,
      txPerSecond: 0,
      bytes: 0,
    },
    peerIds: [],
    overnode: {
      clients: 0, // Number of connected clients
    },
  },
};

const mutations = {
  setHost(state, host) {
    Vue.set(state, 'host', host);
  },
  setNode(state, node) {
    Vue.set(state, 'node', node);
  },
  setStatus(state, status) {
    Vue.set(state.status, 'jobsInErrorCount', status.jobsInErrorCount);
    Vue.set(state.status, 'height', status.height);
    Vue.set(state.status, 'mempool', status.mempool);
    Vue.set(state.status, 'overnode', status.overnode);
    const newPeerIds = status.peers.map(peer => peer.id);
    if (state.status.peerIds.toString() !== newPeerIds.toString()) {
      Vue.set(state.status, 'peerIds', newPeerIds);
    }
  },
};

const actions = {
  async getHost({ dispatch, commit }) {
    const query = `query {
      host {
        hostname
        platform
        cpus {
          model
        }
        totalmem
        donation_address
        overnode_version
      }  
    }`;

    const variables = {
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('setHost', response.host);
  },
  async getNode({ dispatch, commit }) {
    const query = `query {
      node {
        fork
        status
        testnet
      }
    }`;

    const variables = {
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('setNode', response.node);
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
};

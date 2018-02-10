/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */
import Vue from 'vue';

const state = {
  host: {
    hostname: '',
    platform: '',
    cpus: [],
    totalmem: 0,
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
  },
};

const mutations = {
  setHost(state, host) {
    Vue.set(state, 'host', host);
  },
  setStatus(state, status) {
    Vue.set(state, 'status', status);
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
      }  
    }`;

    const variables = {
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('setHost', response.host);
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
};

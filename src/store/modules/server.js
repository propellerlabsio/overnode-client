/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */
import Vue from 'vue';

const state = {
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
  setStatus(state, status) {
    Vue.set(state, 'status', status);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};

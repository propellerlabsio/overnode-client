/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */

const state = {
  mempool: {
    time: null,
    txCount: 0,
    txPerSecond: 0,
  },
};

const mutations = {
  setMempool(state, mempool) {
    state.mempool = mempool;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};

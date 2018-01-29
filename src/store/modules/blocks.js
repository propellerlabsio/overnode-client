/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */

const state = {
  cached: [],
};

const mutations = {
  addBlock(state, block) {
    state.cached.push(block);
  },
};

const actions = {
  async get({ dispatch, commit }) {
    const query = `query {
      blocks {
        hash
        size
        height
        time
        tx_count
        interval
        previousblockhash
        nextblockhash
      }
    }`;

    const variables = {
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    response.blocks.forEach(block => commit('addBlock', block));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

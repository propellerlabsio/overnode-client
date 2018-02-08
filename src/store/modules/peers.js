/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */

const state = {
  current: [],
};

const mutations = {
  setCurrent(state, peers) {
    state.current = peers;
  },
};

const actions = {
  async get({ dispatch, commit }) {
    const query = `query {
      peers {
        id
        addr
        bytessent
        bytesrecv
        pingtime
        subver
        inbound
      }
    }`;

    const variables = {
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('setCurrent', response.peers);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

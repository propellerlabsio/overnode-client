/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */

import Vue from 'vue';

const state = {
  height: 0, // latest block height retrieved
  latest: [], // latest blocks
  selected: {}, // selected block
  // pager: {
  //   blocksPerPage: 15,
  //   page: 1,
  //   previous: null,
  //   next: 2,
  //   blocks: [],
  // },
};

const mutations = {
  setSelected(state, block) {
    Vue.set(state, 'selected', block);
  },
  setHeight(state, height) {
    Vue.set(state, 'height', height);
  },
  setLatest(state, blocks) {
    Vue.set(state, 'latest', blocks);
  },
};

const actions = {
  async setHeight({ dispatch, commit, state }, height) {
    if (state.height !== height) {
      // Set new height
      commit('setHeight', height);

      // Updated latest blocks
      dispatch('getLatest');
    }
  },
  async getLatest({ dispatch, commit }) {
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
    commit('setHeight', response.blocks[0].height);
    commit('setLatest', response.blocks);
  },

  async setSelected({ dispatch, commit }, hash) {
    const query = `query($hash: String!) {
      block(hash: $hash) {
        hash
        confirmations
        size
        height
        version
        versionHex
        merkleroot
        tx
        time
        mediantime
        nonce
        bits
        difficulty
        chainwork
        previousblockhash
        nextblockhash
      }
    }`;

    const variables = {
      hash,
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('setSelected', response.block);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

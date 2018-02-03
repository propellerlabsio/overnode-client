/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */

import Vue from 'vue';

const state = {
  latest: [],
  selected: {},
};

const mutations = {
  setSelected(state, block) {
    Vue.set(state, 'selected', block);
  },
  setLatest(state, blocks) {
    Vue.set(state, 'latest', blocks);
  },
};

const actions = {
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

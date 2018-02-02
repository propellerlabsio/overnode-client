/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */

import Vue from 'vue';

const state = {
  cached: [],
  activeBlock: {},
};

const mutations = {
  setActiveBlock(state, block) {
    Vue.set(state, 'activeBlock', block);
  },
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

  async setActiveBlock({ dispatch, commit }, hash) {
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
    commit('setActiveBlock', response.block);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

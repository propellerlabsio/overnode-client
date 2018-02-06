/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */

import Vue from 'vue';
import moment from 'moment';

const state = {
  limit: 15, // Limit block count in latest and on page
  height: 0, // latest block height retrieved
  latest: [], // latest blocks
  selected: {}, // selected block
  page: {
    current: 1,
    blocks: [],
  },
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
  setPage(stae, { pageNumber, blocks }) {
    Vue.set(state.page, 'current', pageNumber);
    Vue.set(state.page, 'blocks', blocks);
  },
  // humanizeTimes(state) {
  //   // IMPORTANT - do not updated 'latest' it forces redraw of graphs
  //   // with bad UX side effects (lost tooltips, mouseover etc)
  //   console.debug('Humanizing times...');
  //   state.latest.forEach((block, index) => {
  //     const timeMoment = moment.unix(block.time);
  //     block.humanizedTime = timeMoment.fromNow();
  //     Vue.set(state.latest, index, block);
  //   });
  // },
};

const getters = {
  page(state) {
    const last = Math.floor(state.height / state.limit) + 1;
    return Object.assign(state.page, { last });
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
  async gotoPage({ commit, state, dispatch }, pageNumber) {
    if (pageNumber === 1) {
      // We already have latest blocks always updated - no need to call server
      commit('setPage', { pageNumber, blocks: state.latest.slice(0, state.limit) });
    } else {
      // We need to get blocks from server
      const query = `query($fromHeight: Int, $limit: Int) {
        blocks(fromHeight: $fromHeight, limit: $limit) {
          hash
          size
          height
          time
          tx_count
          interval
        }
      }`;

      const variables = {
        fromHeight: state.height - ((pageNumber - 1) * state.limit),
        limit: state.limit,
      };

      // Get blocks
      const response = await dispatch('session/request', { query, variables }, { root: true });
      commit('setPage', { pageNumber, blocks: response.blocks });
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
      }
    }`;

    const variables = {
      limit: state.limit,
    };

    // Remember current block height
    const oldHeight = state.latest[0] && state.latest[0].height;

    // Get latest blocks
    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('setHeight', response.blocks[0].height);
    commit('setLatest', response.blocks);

    // commit('humanizeTimes');

    // Create toast for each new (recent) block
    if (oldHeight) {
      const fiveMinutesAgo = moment().subtract(5, 'minutes');
      response.blocks
        // eslint-disable-next-line
        .filter((block) => {
          const time = moment.unix(block.time);
          return block.height > oldHeight && time.isAfter(fiveMinutesAgo);
        })
        .forEach((block) => {
          commit('toasts/add', { message: `New block <a href="/#/block/${block.hash}">${block.height}</a> found` }, { root: true });
        });
    }

    // If user is browsing blocks but on page 1, refresh the contents
    if (state.page.current === 1) {
      dispatch('gotoPage', 1);
    }
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
  getters,
  mutations,
  actions,
};

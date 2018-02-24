/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */

import Vue from 'vue';
import moment from 'moment';

const state = {
  height: 0, // latest block height retrieved
  latest: [], // latest blocks
  selected: {}, // selected block
  blocksPage: {
    limit: 15,
    current: 1,
    blocks: [],
  },
  transactionsPage: {
    limit: 10,
    current: 1,
    transactions: [],
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
    if (state.blocksPage === 1) {
      Vue.set(state.blocksPage, 'blocks', blocks);
    }
  },
  setBlocksPage(state, { pageNumber, blocks }) {
    Vue.set(state.blocksPage, 'current', pageNumber);
    Vue.set(state.blocksPage, 'blocks', blocks);
  },
  setTransactionsPage(state, { pageNumber, transactions }) {
    Vue.set(state.transactionsPage, 'current', pageNumber);
    Vue.set(state.transactionsPage, 'transactions', transactions);
  },
  humanizeTimes(state) {
    // IMPORTANT - do not updated 'latest' it forces redraw of graphs
    // with bad UX side effects (lost tooltips, mouseover etc)
    state.blocksPage.blocks.forEach((block, index) => {
      const timeMoment = moment.unix(block.time);
      block.humanizedTime = timeMoment.fromNow();
      Vue.set(state.blocksPage.blocks, index, block);
    });
  },
};

const getters = {
  blocksPage(state) {
    const last = Math.floor(state.height / state.blocksPage.limit) + 1;
    return Object.assign(state.blocksPage, { last });
  },
  transactionsPage(state) {
    const txCount = state.selected.tx_count;
    const last = Math.floor(txCount / state.transactionsPage.limit) + 1;
    return Object.assign(state.transactionsPage, { last });
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

  async gotoBlocksPage({ commit, state, dispatch }, pageNumber) {
    if (pageNumber === 1) {
      // We already have latest blocks always updated - no need to call server
      commit('setBlocksPage', { pageNumber, blocks: state.latest.slice(0, state.blocksPage.limit) });
      commit('humanizeTimes');
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

      // Determine from which height we want blocks based on requested page number
      const fromHeight = state.height - ((pageNumber - 1) * state.blocksPage.limit);

      const variables = {
        fromHeight,
        limit: state.blocksPage.limit,
      };

      // Get blocks
      const response = await dispatch('session/request', { query, variables }, { root: true });
      commit('setBlocksPage', { pageNumber, blocks: response.blocks });
      commit('humanizeTimes');
    }
  },

  async gotoTransactionsPage({ commit, state, dispatch }, pageNumber) {
    if (pageNumber === 1) {
      // We already have first page of transactions - no need to call server
      commit('setTransactionsPage', {
        pageNumber,
        transactions: state.selected.transactions.slice(0, state.transactionsPage.limit),
      });
    } else {
      // We need to get transactions from server
      const query = `query($height: Int!, $fromIndex: Int!, $txLimit: Int!) {
        block(height: $height) {
          transactions(fromIndex: $fromIndex,  limit: $txLimit) {
            transaction_id
            transaction_index
            size
            time
            input_count
            output_count
          }
        }
      }`;

      // Determine from which index we want transactions based on requested page number
      const fromIndex = (pageNumber - 1) * state.transactionsPage.limit;

      const variables = {
        height: state.selected.height,
        fromIndex,
        txLimit: state.transactionsPage.limit,
      };

      // Get transactions
      const response = await dispatch('session/request', { query, variables }, { root: true });
      commit('setTransactionsPage', {
        pageNumber,
        transactions: response.block.transactions,
      });
    }
  },

  async getLatest({ dispatch, commit }) {
    const query = `query($limit: Int!) {
      blocks(limit: $limit) {
        hash
        size
        height
        time
        tx_count
        interval
      }
    }`;

    const variables = {
      limit: state.blocksPage.limit,
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
          commit('toasts/add', { message: `New block <a href="/#/block/${block.height}">${block.height}</a> found` }, { root: true });
        });
    }

    // If user is browsing blocks but on page 1, refresh the contents
    if (state.blocksPage.current === 1) {
      dispatch('gotoBlocksPage', 1);
    }
  },

  async setSelected({ dispatch, commit, state }, height) {
    const query = `query($height: Int!, $txLimit: Int!) {
      block(height: $height) {
        hash
        size
        height
        time
        tx_count
        interval
        transactions(fromIndex:0,  limit: $txLimit) {
          transaction_id
          transaction_index
          size
          time
          input_count
          output_count
        }
      }
    }`;

    const variables = {
      height,
      txLimit: state.transactionsPage.limit,
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

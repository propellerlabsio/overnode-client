/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */

import Vue from 'vue';
import moment from 'moment';
import paging from './util/paging';

const state = {
  height: 0, // latest block height retrieved
  latest: [], // latest blocks
  selected: {}, // selected block
  blocksPaging: {
    limit: 15,
    offset: 0,
  },
  pageBlocks: [],
  transactionsPaging: {
    limit: 10,
    offset: 0,
  },
  highlightedTransactionIndex: null,
  pageTransactions: [],
};

const mutations = {
  setSelected(state, block) {
    Vue.set(state, 'selected', block);
  },
  setHeight(state, height) {
    Vue.set(state, 'height', height);
  },
  setHighlightedTransactionIndex(state, transactionIndex) {
    Vue.set(state, 'highlightedTransactionIndex', transactionIndex);
  },
  setLatest(state, blocks) {
    Vue.set(state, 'latest', blocks);
    if (state.blocksPaging.offset === 0) {
      Vue.set(state, 'pageBlocks', blocks);
    }
  },
  setBlocksPaging(state, pageNumber) {
    paging.setPaging(state.blocksPaging, pageNumber);
  },
  setPageBlocks(state, blocks) {
    Vue.set(state, 'pageBlocks', blocks);
  },
  setTransactionsPaging(state, pageNumber) {
    paging.setPaging(state.transactionsPaging, pageNumber);
  },
  setPageTransactions(state, transactions) {
    Vue.set(state, 'pageTransactions', transactions);
  },
  humanizeTimes(state) {
    // IMPORTANT - do not updated 'latest' it forces redraw of graphs
    // with bad UX side effects (lost tooltips, mouseover etc)
    state.pageBlocks.forEach((block, index) => {
      const timeMoment = moment.unix(block.time);
      block.humanizedTime = timeMoment.fromNow();
      Vue.set(state.pageBlocks, index, block);
    });
  },
};

const getters = {
  blocksPage: state =>
    paging.getPage(state.blocksPaging, state.pageBlocks, state.height),
  transactionsPage: state =>
    paging.getPage(state.transactionsPaging, state.pageTransactions, state.selected.tx_count),
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

  async setBlocksPage({ dispatch, commit, state }, pageNumber) {
    commit('setBlocksPaging', pageNumber);

    if (pageNumber === 1) {
      // We already have latest blocks always updated - no need to call server
      commit('setPageBlocks', state.latest.slice(0, state.blocksPaging.limit));
      commit('humanizeTimes');
    } else {
      // We need to get blocks from server
      const query = `query($paging: Paging) {
        blocks(paging: $paging) {
          hash
          size
          height
          time
          tx_count
          interval
        }
      }`;

      const variables = {
        paging: state.blocksPaging,
      };

      // Get blocks
      const response = await dispatch('session/request', { query, variables }, { root: true });
      commit('setPageBlocks', response.blocks);
      commit('humanizeTimes');
    }
  },

  async setTransactionsPage({ commit, state, dispatch }, pageNumber) {
    // Set paging control values
    commit('setTransactionsPaging', pageNumber);

    if (pageNumber === 1) {
      // We already have first page of transactions - no need to call server
      commit('setPageTransactions', state.selected.transactions.slice(0, state.transactionsPaging.limit));
    } else {
      // We need to get transactions from server
      const query = `query($height: Int!, $paging: Paging!) {
        block(height: $height) {
          transactions(paging: $paging) {
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
        height: state.selected.height,
        paging: state.transactionsPaging,
      };

      // Get transactions
      const response = await dispatch('session/request', { query, variables }, { root: true });
      commit('setPageTransactions', response.block.transactions);
    }
  },

  async getLatest({ dispatch, commit }) {
    const query = `query($paging: Paging!) {
      blocks(paging: $paging) {
        hash
        size
        height
        time
        tx_count
        interval
      }
    }`;

    const variables = {
      paging: {
        limit: state.blocksPaging.limit,
        offset: 0,
      },
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
    if (state.blocksPaging.offset === 0) {
      dispatch('setBlocksPage', 1);
    }
  },

  async setSelected({ dispatch, commit, state }, height) {
    commit('setTransactionsPaging', 1);
    const query = `query($height: Int!, $transactionsPaging: Paging!) {
      block(height: $height) {
        hash
        size
        height
        time
        tx_count
        interval
        transactions(paging: $transactionsPaging) {
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
      transactionsPaging: state.transactionsPaging,
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

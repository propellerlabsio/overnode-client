/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-param-reassign                                      */
import Vue from 'vue';

const initialState = {
  selected: null,
};

const mutations = {
  setSelected(state, transaction) {
    Vue.set(state, 'selected', transaction);
  },
};

const actions = {
  async setSelected({ dispatch, commit }, transactionId) {
    commit('setSelected', null);
    const query = `query($transactionId: String!) {
      transaction(transaction_id: $transactionId) {
        transaction_id
        transaction_index
        size
        block_hash
        time
        input_count
        output_count
        inputs {
          input_index
          coinbase
          output_transaction_id
          output_index
        }
        outputs {
          transaction_id
          output_index
          value
          addresses
        }        
      }
    }`;

    const variables = {
      transactionId,
    };

    // Execute query and set data in store
    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('setSelected', response.transaction);
  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};

/* Can't use vuex mutations with these airbnb rules:                     */
/* eslint-disable no-param-reassign                                      */
import Vue from 'vue';
import paging from './util/paging';

const initialState = {
  selected: null,
  inputsPaging: {
    limit: 10,
    offset: 0,
  },
  outputsPaging: {
    limit: 10,
    offset: 0,
  },
};

const mutations = {
  addInputs(state, inputs) {
    inputs.forEach(input => state.selected.inputs.push(input));
  },
  addOutputs(state, outputs) {
    outputs.forEach(output => state.selected.outputs.push(output));
  },
  setInputsPage: (state, pageNumber) => paging.setPaging(state.inputsPaging, pageNumber),
  setOutputsPage: (state, pageNumber) => paging.setPaging(state.outputsPaging, pageNumber),
  setSelected(state, transaction) {
    Vue.set(state, 'selected', transaction);
    state.inputsPaging.offset = 0;
    state.outputsPaging.offset = 0;
  },
};

const getters = {
  inputsPage: (state) => {
    let result = [];
    if (state.selected) {
      result = paging.getPage(state.inputsPaging, state.selected.inputs, state.selected.input_count, 'input_number');
    }
    return result;
  },
  outputsPage: (state) => {
    let result = [];
    if (state.selected) {
      result = paging.getPage(state.outputsPaging, state.selected.outputs, state.selected.output_count, 'output_number');
    }
    return result;
  },
};

const actions = {
  /**
   * Fetch additional inputs from the server for the current page and add to the store
   */
  async addInputs({ dispatch, commit, state }) {
    const query = `query($transactionId: String!, $paging: Paging!) {
      transaction(transaction_id: $transactionId) {
        inputs(paging: $paging) {
          input_number
          coinbase
          output_transaction_id
          output_number
          output_value
        }
      }
    }`;

    const variables = {
      transactionId: state.selected.transaction_id,
      paging: state.inputsPaging,
    };

    // Execute query and set data in store
    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('addInputs', response.transaction.inputs);
  },

  /**
   * Fetch additional outputs from the server for the current page and add to the store
   */
  async addOutputs({ dispatch, commit, state }) {
    const query = `query($transactionId: String!, $paging: Paging!) {
      transaction(transaction_id: $transactionId) {
        outputs(paging: $paging) {
          transaction_id
          output_number
          value
          address
          addresses
        }
      }
    }`;

    const variables = {
      transactionId: state.selected.transaction_id,
      paging: state.outputsPaging,
    };

    // Execute query and set data in store
    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('addOutputs', response.transaction.outputs);
  },

  async setInputsPage({ dispatch, commit, state }, pageNumber) {
    commit('setInputsPage', pageNumber);

    // Check to see if we aleady have data for this page
    const offset = state.inputsPaging.offset;
    const input = state.selected.inputs[offset];
    if (!input) {
      // Get additional data for this page from server and add to store
      await dispatch('addInputs');
    }
  },

  async setOutputsPage({ dispatch, commit, state }, pageNumber) {
    commit('setOutputsPage', pageNumber);

    // Check to see if we aleady have data for this page
    const offset = state.outputsPaging.offset;
    const output = state.selected.outputs[offset];
    if (!output) {
      // Get additional data for this page from server and add to store
      await dispatch('addOutputs');
    }
  },

  async setSelected({ dispatch, commit, state }, transactionId) {
    commit('setSelected', null);
    const query = `query($transactionId: String!, $inputsPaging: Paging!, $outputsPaging: Paging!) {
      transaction(transaction_id: $transactionId) {
        transaction_id
        transaction_index
        size
        block_height
        time
        input_count
        output_count
        inputs(paging: $inputsPaging) {
          input_number
          coinbase
          output_transaction_id
          output_number
          output_value
        }
        outputs(paging: $outputsPaging) {
          transaction_id
          output_number
          value
          address
          addresses
        }        
      }
    }`;

    const variables = {
      transactionId,
      inputsPaging: state.inputsPaging,
      outputsPaging: state.outputsPaging,
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
  getters,
  actions,
};

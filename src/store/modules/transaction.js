/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-param-reassign                                      */
import Vue from 'vue';

const initialState = {
  selected: null,
  inputsPaging: {
    limit: 10,
    fromIndex: 0,
  },
  outputsPaging: {
    limit: 10,
    fromIndex: 0,
  },
};

const mutations = {
  addInputs(state, inputs) {
    inputs.forEach(input => state.selected.inputs.push(input));
  },
  addOutputs(state, outputs) {
    outputs.forEach(output => state.selected.outputs.push(output));
  },
  resetInputsPage(state) {
    state.inputsPaging.fromIndex = 0;
  },
  resetOutputsPage(state) {
    state.outputsPaging.fromIndex = 0;
  },
  setInputsPage(state, fromIndex) {
    state.inputsPaging.fromIndex = fromIndex;
  },
  setOutputsPage(state, fromIndex) {
    state.outputsPaging.fromIndex = fromIndex;
  },
  setSelected(state, transaction) {
    Vue.set(state, 'selected', transaction);
  },
};

const getters = {
  inputsPage(state) {
    let result = null;
    if (state.selected) {
      const paging = state.inputsPaging;
      const inputCount = state.selected.input_count;
      const inputs = state.selected.inputs.slice(paging.fromIndex, paging.fromIndex + paging.limit);

      result = {
        fromIndex: paging.fromIndex,
        limit: paging.limit,
        current: Math.floor(paging.fromIndex / paging.limit) + 1,
        last: Math.floor(inputCount / paging.limit) + 1,
        inputs,
      };
    }
    return result;
  },
  outputsPage(state) {
    let result = null;
    if (state.selected) {
      const paging = state.outputsPaging;
      const outputCount = state.selected.output_count;
      const outputs = state.selected.outputs.slice(
        paging.fromIndex,
        paging.fromIndex + paging.limit,
      );
      result = {
        fromIndex: paging.fromIndex,
        limit: paging.limit,
        current: Math.floor(paging.fromIndex / paging.limit) + 1,
        last: Math.floor(outputCount / paging.limit) + 1,
        outputs,
      };
    }
    return result;
  },
};

const actions = {
  /**
   * Fetch additional inputs from the server and add to the store
   */
  async addInputs({ dispatch, commit, state }, fromIndex) {
    const query = `query($transactionId: String!, $fromIndex: Int!, $limit: Int!) {
      transaction(transaction_id: $transactionId) {
        inputs(fromIndex: $fromIndex, limit: $limit) {
          input_index
          coinbase
          output_transaction_id
          output_index
        }
      }
    }`;

    const variables = {
      transactionId: state.selected.transaction_id,
      fromIndex,
      limit: state.inputsPaging.limit,
    };

    // Execute query and set data in store
    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('addInputs', response.transaction.inputs);
  },

  /**
   * Fetch additional outputs from the server and add to the store
   */
  async addOutputs({ dispatch, commit, state }, fromIndex) {
    const query = `query($transactionId: String!, $fromIndex: Int!, $limit: Int!) {
      transaction(transaction_id: $transactionId) {
        outputs(fromIndex: $fromIndex, limit: $limit) {
          transaction_id
          output_index
          value
          addresses
        }
      }
    }`;

    const variables = {
      transactionId: state.selected.transaction_id,
      fromIndex,
      limit: state.outputsPaging.limit,
    };

    // Execute query and set data in store
    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('addOutputs', response.transaction.outputs);
  },

  async setInputsPage({ dispatch, commit, state }, fromIndex) {
    // Check to see if we aleady have inputs from index given
    const input = state.selected.inputs[fromIndex];
    if (!input) {
      // Get inputs from server and add to store
      await dispatch('addInputs', fromIndex);
    }
    commit('setInputsPage', fromIndex);
  },

  async setOutputsPage({ dispatch, commit, state }, fromIndex) {
    // Check to see if we aleady have outputs from index given
    const output = state.selected.outputs[fromIndex];
    if (!output) {
      // Get inputs from server and add to store
      await dispatch('addOutputs', fromIndex);
    }
    commit('setOutputsPage', fromIndex);
  },

  async setSelected({ dispatch, commit, state }, transactionId) {
    commit('setSelected', null);
    commit('resetInputsPage');
    commit('resetOutputsPage');
    const query = `query($transactionId: String!, $inputsFromIndex: Int!, $inputsLimit: Int!, $outputsFromIndex: Int!, $outputsLimit: Int!) {
      transaction(transaction_id: $transactionId) {
        transaction_id
        transaction_index
        size
        block_hash
        time
        input_count
        output_count
        inputs(fromIndex: $inputsFromIndex, limit: $inputsLimit) {
          input_index
          coinbase
          output_transaction_id
          output_index
        }
        outputs(fromIndex: $outputsFromIndex, limit: $outputsLimit) {
          transaction_id
          output_index
          value
          addresses
        }        
      }
    }`;

    const variables = {
      transactionId,
      inputsFromIndex: state.inputsPaging.fromIndex,
      inputsLimit: state.inputsPaging.limit,
      outputsFromIndex: state.outputsPaging.fromIndex,
      outputsLimit: state.outputsPaging.limit,
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

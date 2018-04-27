const initialState = {
  transactionId: '',
  raw: '',
};

const mutations = {
  /**
   * Initialize transaction being edited from raw tx from blockchain
   */
  initFromRaw(state, { rawString, transactionId }) {
    state.transactionId = transactionId;
    state.raw = JSON.parse(rawString);
  },

};

const actions = {
  /**
   * Load existing transaction from the blockchain
   */
  async load({ commit, dispatch }, transactionId) {
    const query = `query ($txid: String!, $verbose: Int) {
        rpc_getrawtransaction(txid: $txid, verbose: $verbose)
      }      
    `;
    const variables = {
      txid: transactionId,
      verbose: 1,
    };
    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('initFromRaw', { rawString: response.rpc_getrawtransaction, transactionId });
  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};

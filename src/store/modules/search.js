const initialState = {
  term: null,
  results: null,
};

const mutations = {
  setTerm(state, term) {
    state.term = term;
  },
  setResults(state, results) {
    state.results = results;
  },
};

const actions = {
  async execute({ dispatch, commit }, term) {
    commit('setTerm', term);

    // We need to get blocks from server
    const query = `query($term: String!) {
      search(term: $term) {
        block {
          height
        }
        transaction {
          transaction_id
        }
        address {
          address
        }
      }
    }`;

    const variables = {
      term,
    };

    // Get search results
    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('setTerm', term);
    commit('setResults', response.search);
  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};

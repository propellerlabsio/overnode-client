const initialState = {
  selected: 'BCH',
  all: [{
    code: 'BCH',
    label: 'Bitcoin Cash',
    bch_rate: 1,
    decimal_places: 8,
  }],
};

const getters = {
  selected(state) {
    return state.all.find(currency => currency.code === state.selected);
  },
};

const mutations = {
  setSelected(state, code) {
    state.selected = code;
  },
  setAll(state, currencies) {
    state.all = currencies;
  },
};

const actions = {
  async updatePrices({ commit, dispatch }) {
    const query = `query {
      currencies {
        code
        label
        bch_rate
        decimal_places
        rate_updated        
      }
    }`;

    const variables = {
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('setAll', response.currencies);
  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  getters,
  actions,
};

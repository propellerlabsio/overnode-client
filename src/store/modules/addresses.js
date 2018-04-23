import Vue from 'vue';

const pagingLimit = 10;

const initialState = {
  selected: {
    address: '',
    totals: {
      received: 0,
      spent: 0,
    },
    received: [],
    spent: [],
  },
  control: {
    address: {
      loading: true,
    },
    received: {
      loading: true,
      maybeMore: false,
    },
    spent: {
      loading: true,
      maybeMore: false,
    },
  },
};

const mutations = {
  addMoreReceived(state, received) {
    received.forEach(record => state.selected.received.push(record));
  },
  addMoreSpent(state, spent) {
    spent.forEach(record => state.selected.spent.push(record));
  },
  resetSelected(state) {
    Vue.set(state, 'selected', initialState.selected);
    Vue.set(state, 'control', initialState.control);
  },
  setAddressLoading(state, loading) {
    Vue.set(state.control.address, 'loading', loading);
  },
  setReceivedLoading(state, loading) {
    Vue.set(state.control.received, 'loading', loading);
  },
  setSpentLoading(state, loading) {
    Vue.set(state.control.spent, 'loading', loading);
  },
  setReceivedMaybeMore(state, maybeMore) {
    state.control.received.maybeMore = maybeMore;
  },
  setSpentMaybeMore(state, maybeMore) {
    state.control.spent.maybeMore = maybeMore;
  },
  setSelected(state, selected) {
    state.selected = selected;
  },
};

const actions = {
  async addMoreReceived({ dispatch, commit, state }) {
    if (!state.control.received.maybeMore) {
      return;
    }

    commit('setReceivedLoading', true);

    const query = `query($address: String!, $paging: Paging!) {
      address(address:$address) {
        received(paging: $paging) {
          transaction_id
          output_number
          value
          addresses
        }
      }
    }`;

    const variables = {
      address: state.selected.address,
      paging: {
        offset: state.selected.received.length - 1,
        limit: pagingLimit,
      },
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('addMoreReceived', response.address.received);
    commit('setReceivedMaybeMore', response.address.received.length === pagingLimit);
    commit('setReceivedLoading', false);
  },

  async addMoreSpent({ dispatch, commit, state }) {
    if (!state.control.spent.maybeMore) {
      return;
    }

    commit('setSpentLoading', true);

    const query = `query($address: String!, $paging: Paging!) {
      address(address:$address) {
        spent(paging: $paging) {
          transaction_id
          input_number
          output_value
        }
      }
    }`;

    const variables = {
      address: state.selected.address,
      paging: {
        offset: state.selected.spent.length - 1,
        limit: pagingLimit,
      },
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('addMoreSpent', response.address.spent);
    commit('setSpentMaybeMore', response.address.spent.length === pagingLimit);
    commit('setSpentLoading', false);
  },

  async setSelected({ dispatch, commit }, address) {
    commit('resetSelected');
    commit('setAddressLoading', true);
    commit('setReceivedLoading', true);
    commit('setSpentLoading', true);
    const query = `query($address: String!, $spentPaging: Paging!, $receivedPaging: Paging!) {
      address(address:$address) {
        address
        totals {
          received
          spent
        }
        received(paging: $receivedPaging) {
          transaction_id
          output_number
          value
          addresses
        }
        spent(paging: $spentPaging) {
          transaction_id
          input_number
          output_value
        }
      }
    }`;

    const variables = {
      address,
      receivedPaging: {
        offset: 0,
        limit: pagingLimit,
      },
      spentPaging: {
        offset: 0,
        limit: pagingLimit,
      },
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    commit('setSelected', response.address);
    commit('setReceivedMaybeMore', response.address.received.length === pagingLimit);
    commit('setSpentMaybeMore', response.address.spent.length === pagingLimit);
    commit('setAddressLoading', false);
    commit('setReceivedLoading', false);
    commit('setSpentLoading', false);
  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};

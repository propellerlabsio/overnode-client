import ByteBuffer from 'bytebuffer';

const initialState = {
  hex: null,
  hexString: '',
};

const mutations = {
  loadFromHexString(state, hexString) {
    state.hexString = hexString;
    state.hex = ByteBuffer.fromHex(hexString);
  },
  reset(state) {
    state.hex = null;
    state.hexString = '';
  },
};

const actions = {
  load({ commit }, { hexString }) {
    commit('loadFromHexString', hexString);
  },
  reset({ commit }) {
    commit('reset');
  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};

/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */

import Vue from 'vue';

const state = {
  current: [],
};

const mutations = {
  add(state, { message, timeoutSecs = 10 }) {
    const now = new Date();
    const expires = new Date(now.valueOf() + (timeoutSecs * 1000));
    state.current.push({
      id: now.valueOf(),
      expires,
      message,
    });
  },
  remove(state, id) {
    const newCurrent = state
      .current
      .slice()
      .filter(toast => toast.id !== id);
    Vue.set(state, 'current', newCurrent);
  },
  removeExpired(state) {
    const now = new Date();
    const newCurrent = state
      .current
      .slice()
      .filter(toast => toast.expires > now);
    Vue.set(state, 'current', newCurrent);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};

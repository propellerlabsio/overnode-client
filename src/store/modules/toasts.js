/* Can't use vuex mutations with these airbnb rules:                                */
/* eslint-disable no-shadow, no-param-reassign                                      */

import Vue from 'vue';

const state = {
  current: [],
};

const mutations = {
  /**
   * Add a toast message to the stack
   *
   * @param {Object} state - Vuex state
   * @param {Object} options - Toast options
   * @param {string} options.message - Message text
   * @param {string} options.timeoutSecs - Remove after number of seconds
   * @param {string} options.type - Bulma type: success, warning, danger etc
   * @param {string} options.position - Toast position: top || bottom
   */
  add(state, { message, timeoutSecs = 10, type = 'success', position = 'bottom' }) {
    const now = new Date();
    const expires = new Date(now.valueOf() + (timeoutSecs * 1000));
    state.current.push({
      id: now.valueOf(),
      position,
      expires,
      message,
      type,
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

const getters = {
  bottom: state => state.current.filter(toast => toast.position === 'bottom'),
  top: state => state.current.filter(toast => toast.position === 'top'),
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};

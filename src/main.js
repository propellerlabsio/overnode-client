import Vue from 'vue';
import Vuex from 'vuex';

import App from './App';

import createStore from './store/index';
import router from './router';

Vue.use(Vuex);
const store = createStore();

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
});

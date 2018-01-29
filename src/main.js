import Vue from 'vue';
import App from './App';

import store from './store';
import router from './router';

// Dynamically referencec component imports
import BlockTimes from './components/overview/BlockTimes';
import TransactionRate from './components/overview/TransactionRate';

Vue.component('block-times', BlockTimes);
Vue.component('transaction-rate', TransactionRate);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
});

import Vue from 'vue';
import App from './App';

import store from './store';
import router from './router';

// Dynamically referencec component imports
import BlockTimes from './components/overview/BlockTimes';

Vue.component('block-times', BlockTimes);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
});

// Node module imports
import Vue from 'vue';
import Router from 'vue-router';

// Route imports
import adminRoutes from './admin';
import mainRoutes from './main';

Vue.use(Router);

export default new Router({
  routes: mainRoutes.concat(adminRoutes),
});

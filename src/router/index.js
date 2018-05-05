// Node module imports
import Vue from 'vue';
import Router from 'vue-router';

// Route imports
import adminRoutes from './admin';
import generalRoutes from './general';
import developerRoutes from './developer';

Vue.use(Router);

export default new Router({
  routes: generalRoutes.concat(adminRoutes).concat(developerRoutes),
});

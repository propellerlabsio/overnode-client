import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import BlocksPage from '@/components/BlocksPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/blocks',
      name: 'Blocks',
      component: BlocksPage,
    },
  ],
});

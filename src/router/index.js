import Vue from 'vue';
import Router from 'vue-router';
import OverviewPage from '@/components/pages/OverviewPage';
import BlockPage from '@/components/pages/BlockPage';
import BlocksPage from '@/components/pages/BlocksPage';
import DonationsPage from '@/components/pages/DonationsPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: OverviewPage,
    },
    {
      path: '/blocks',
      name: 'Blocks',
      component: BlocksPage,
    },
    {
      path: '/block/:hash',
      name: 'Block',
      component: BlockPage,
    },
    {
      path: '/donate',
      name: 'Donate',
      component: DonationsPage,
    },
  ],
});

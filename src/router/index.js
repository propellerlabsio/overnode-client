import Vue from 'vue';
import Router from 'vue-router';
import OverviewPage from '@/components/OverviewPage';
import BlocksPage from '@/components/BlocksPage';
import WalletPage from '@/components/WalletPage';
import DonationsPage from '@/components/DonationsPage';

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
      path: '/wallet',
      name: 'Wallet',
      component: WalletPage,
    },
    {
      path: '/donate',
      name: 'Donate',
      component: DonationsPage,
    },
  ],
});

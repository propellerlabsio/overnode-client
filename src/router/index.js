import Vue from 'vue';
import Router from 'vue-router';
import OverviewPage from '@/components/pages/OverviewPage';
import BlockPage from '@/components/pages/BlockPage';
import BlocksPage from '@/components/pages/BlocksPage';
import DonationsPage from '@/components/pages/DonationsPage';
import PeerPage from '@/components/pages/PeerPage';
import PeersPage from '@/components/pages/PeersPage';
import QueryPage from '@/components/pages/QueryPage';
import PrioritySyncingPage from '@/components/pages/PrioritySyncingPage';
import TransactionPage from '@/components/pages/TransactionPage';

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
      path: '/block/:height',
      name: 'Block',
      component: BlockPage,
    },
    {
      path: '/donate',
      name: 'Donate',
      component: DonationsPage,
    },
    {
      path: '/peer/:peerId',
      name: 'Peer',
      component: PeerPage,
    },
    {
      path: '/peers',
      name: 'Peers',
      component: PeersPage,
    },
    {
      path: '/query',
      name: 'Query',
      component: QueryPage,
    },
    {
      path: '/syncing',
      name: 'PrioritySyncing',
      component: PrioritySyncingPage,
    },
    {
      path: '/transaction/:transactionId',
      name: 'Transaction',
      component: TransactionPage,
    },
  ],
});

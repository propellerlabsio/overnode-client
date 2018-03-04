// Node module imports
import Vue from 'vue';
import Router from 'vue-router';

// Page imports
import AdminPage from '@/components/pages/AdminPage';
import BlockPage from '@/components/pages/BlockPage';
import BlocksPage from '@/components/pages/BlocksPage';
import DonationsPage from '@/components/pages/DonationsPage';
import OverviewPage from '@/components/pages/OverviewPage';
import PeerPage from '@/components/pages/PeerPage';
import PeersPage from '@/components/pages/PeersPage';
import PrioritySyncingPage from '@/components/pages/PrioritySyncingPage';
import QueryPage from '@/components/pages/QueryPage';
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
      path: '/admin',
      name: 'Admin',
      component: AdminPage,
    },
    {
      path: '/blocks',
      name: 'Blocks',
      component: BlocksPage,
    },
    {
      path: '/blocks/page/:pageNumber',
      name: 'BlocksPage',
      component: BlocksPage,
    },
    {
      path: '/block/:height',
      name: 'Block',
      component: BlockPage,
    },
    {
      path: '/block/:height/transactions/page/:pageNumber',
      name: 'BlockTransactions',
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

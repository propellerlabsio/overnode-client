// Page imports
import AddressPage from '@/components/pages/AddressPage';
import BlockPage from '@/components/pages/BlockPage';
import BlocksPage from '@/components/pages/BlocksPage';
import DonationsPage from '@/components/pages/DonationsPage';
import OverviewPage from '@/components/pages/OverviewPage';
import PeerPage from '@/components/pages/PeerPage';
import PeersPage from '@/components/pages/PeersPage';
import QueryPage from '@/components/pages/QueryPage';
import TransactionPage from '@/components/pages/TransactionPage';


const mainRoutes = [
  {
    path: '/',
    name: 'Home',
    component: OverviewPage,
  },
  {
    path: '/address/:address',
    name: 'Address',
    component: AddressPage,
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
    path: '/block/:height/transaction/:transactionIndex',
    name: 'BlockTransaction',
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
    path: '/peers/page/:pageNumber',
    name: 'PeersPage',
    component: PeersPage,
  },
  {
    path: '/query',
    name: 'Query',
    component: QueryPage,
  },
  {
    path: '/transaction/:transactionId',
    name: 'Transaction',
    component: TransactionPage,
  },
];

export default mainRoutes;

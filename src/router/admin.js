
import AdminPage from '@/components/pages/AdminPage';
import SyncErrors from '@/components/pages/AdminPage/SyncErrors';
import TransactionBuilder from '@/components/pages/AdminPage/TransactionBuilder';

const adminRoutes = [
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    children: [{
      name: 'TransactionBuilder',
      path: 'transaction-builder',
      component: TransactionBuilder,
    }, {
      name: 'SyncErrors',
      path: 'sync-errors',
      component: SyncErrors,
    }],
  },
];

export default adminRoutes;

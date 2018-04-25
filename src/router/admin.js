
import AdminPage from '@/components/pages/AdminPage';
import SyncErrors from '@/components/pages/AdminPage/SyncErrors';
import TransactionTool from '@/components/pages/AdminPage/TransactionTool';

const adminRoutes = [
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    children: [{
      path: 'transaction-tool',
      component: TransactionTool,
    }, {
      path: 'sync-errors',
      component: SyncErrors,
    }],
  },
];

export default adminRoutes;

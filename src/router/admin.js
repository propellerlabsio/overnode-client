
import AdminPage from '@/components/pages/AdminPage';
import SyncErrors from '@/components/pages/AdminPage/SyncErrors';
import RpcTool from '@/components/pages/AdminPage/RpcTool';
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
      name: 'RpcTool',
      path: 'rpc/:commandName',
      component: RpcTool,
    }, {
      name: 'SyncErrors',
      path: 'sync-errors',
      component: SyncErrors,
    }],
  },
];

export default adminRoutes;

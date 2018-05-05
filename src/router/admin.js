
import AdminPage from '@/components/pages/AdminPage';
import SyncErrors from '@/components/pages/AdminPage/SyncErrors';

const adminRoutes = [
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    children: [{
      name: 'SyncErrors',
      path: 'sync-errors',
      component: SyncErrors,
    }],
  },
];

export default adminRoutes;

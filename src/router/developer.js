
import HexEditor from '@/components/pages/ScriptTool/HexEditor';
import QueryPage from '@/components/pages/QueryPage';
import RpcTool from '@/components/pages/RpcTool';
import ScriptEditor from '@/components/pages/ScriptTool/ScriptEditor';
import ScriptTool from '@/components/pages/ScriptTool';
import Utf8Viewer from '@/components/pages/ScriptTool/Utf8Viewer';

const developerRoutes = [
  {
    path: '/query',
    name: 'Query',
    component: QueryPage,
  },
  {
    name: 'RpcTool',
    path: '/rpc',
    component: RpcTool,
  },
  {
    name: 'RpcCommand',
    path: '/rpc/:commandName',
    component: RpcTool,
  },
  {
    path: '/script',
    component: ScriptTool,
    children: [{
      name: 'ScriptEditor',
      path: '/',
      component: ScriptEditor,
    }, {
      name: 'HexEditor',
      path: 'hex',
      component: HexEditor,
    }, {
      name: 'Utf8Viewer',
      path: 'utf8',
      component: Utf8Viewer,
    }],
  },
];

export default developerRoutes;

import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import S1 from 'src/pages/S1';
import S2 from 'src/pages/S2';
import Report from 'src/pages/Report';
import Order from 'src/pages/Order';
import O1 from 'src/pages/O1';
import O2 from 'src/pages/O2';
import D1 from 'src/pages/D1';
import D2 from 'src/pages/D2';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 's1', element: <S1 /> },
      { path: 's2', element: <S2 /> },
      { path: 'report', element: <Report /> },
      { path: 'order', element: <Order /> },
      { path: 'o1', element: <O1 /> },
      { path: 'o2', element: <O2 /> },
      { path: 'd1', element: <D1 /> },
      { path: 'd2', element: <D2 /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element:  <Login /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;

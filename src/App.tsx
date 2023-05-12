import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './page/Login';

import ProtectedRoute from './utils/ProtectedRoute';
import Dashboard from './components/section/Dashboard';
import Main from './page/Main';
import TokenService from './service/Token';
import ApiService from './service/ApiServices';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
  {
    path: '/kategori',
    element: (
      <ProtectedRoute>
        <Dashboard>CUaks</Dashboard>
      </ProtectedRoute>
    ),
  },
]);

if (TokenService.getToken()) {
  ApiService.setHeader();
  ApiService.mount401Interceptor();
} else {
  ApiService.removeHeader();
  ApiService.unmount401Interceptor();
}

ApiService.init('http://localhost:3000/api/v1');

function App() {
  return <RouterProvider router={router} />;
}

export default App;

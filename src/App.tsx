import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import ApiService from './service/ApiService';
import TokenService from './service/TokenService';
import ProtectedRoute from './utils/ProtectedRoute';
import Dashboard from './components/section/Dashboard';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard>Helo</Dashboard>
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

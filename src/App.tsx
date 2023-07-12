import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./page/Login";

import Category from "./page/Category";
import Main from "./page/Main";
import ApiService from "./service/ApiServices";
import TokenService from "./service/Token";
import ProtectedRoute from "./utils/ProtectedRoute";
import LogBlockWeb from "./page/LogBlockWeb";
import LogBlockText from "./page/LogBlockText";
import Landing from "./page/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
  {
    path: "/kategori",
    element: (
      <ProtectedRoute>
        <Category />
      </ProtectedRoute>
    ),
  },
  {
    path: "/log-blokir-web",
    element: (
      <ProtectedRoute>
        <LogBlockWeb />
      </ProtectedRoute>
    ),
  },
  {
    path: "/log-blokir-teks",
    element: (
      <ProtectedRoute>
        <LogBlockText />
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

ApiService.init("https://backend-website-skripsi.vercel.app/api/v1");

function App() {
  // return <RouterProvider router={router} />;
  return <RouterProvider router={router} />;
}

export default App;

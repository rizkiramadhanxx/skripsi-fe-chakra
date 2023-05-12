import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { logout } from '../redux/action/authSlice';
import { RootState } from '../redux/store';
import TokenService from '@/service/TokenService';

type TProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: any = ({ children }: TProtectedRouteProps) => {
  // from redux if loggend direct dashboard
  const isLogin = useSelector((state: RootState) => state.auth).isLogin;

  const Location = useLocation();

  const dispatch = useDispatch();

  if (!TokenService.getToken()) {
    dispatch(logout());
  }

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  } else {
    if (['/login', '/register'].includes(Location.pathname)) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  }
};

export default ProtectedRoute;

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de importar el contexto de autenticación
import { LinearProgress } from '@mui/material';

export const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LinearProgress />; // Componente de carga mientras se verifica el estado de autenticación
  }

  return user ? <Navigate to="/" /> : <Outlet />; // Redirige al usuario si está logueado
};

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de importar el contexto de autenticación
import { LinearProgress } from '@mui/material';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // Puedes mostrar un spinner o algún componente de carga mientras se verifica el estado de autenticación
    return <LinearProgress />; // O cualquier componente de carga que prefieras
  }

  return user ? <Outlet /> : <Navigate to="/sing-in" />;
};

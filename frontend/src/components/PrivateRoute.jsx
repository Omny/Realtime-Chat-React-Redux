import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import routes from '../routes';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.isLoggedIn ? children : <Navigate to={routes.loginPagePath()} replace />;
};

export default PrivateRoute;

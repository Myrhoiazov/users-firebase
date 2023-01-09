import UserContext from 'components/context/UserProvider';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuth } = useContext(UserContext);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

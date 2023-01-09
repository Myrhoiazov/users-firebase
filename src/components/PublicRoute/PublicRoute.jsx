import UserContext from 'components/context/UserProvider';
import { useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { isAuth } = useContext(UserContext);



  return isAuth ? <Navigate to="/" /> : <Outlet/> ;
};

export default PublicRoute;

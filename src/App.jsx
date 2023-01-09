import { BrowserRouter } from 'react-router-dom';
import ClientRoutes from 'ClientRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import UserContext from 'components/context/UserProvider';
import { useContext, useEffect } from 'react';

export const App = () => {
  const { setIsAuth } = useContext(UserContext);

  useEffect(() => {
    const localAuth = localStorage.getItem('isAuth');

    if (Boolean(localAuth)) {
      setIsAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter basename="/users-firebase">
      <Header />
      <ClientRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
};

import { BrowserRouter } from 'react-router-dom';
import ClientRoutes from 'ClientRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import UserContext from 'components/context/UserProvider';
import { useContext, useEffect } from 'react';

export const App = () => {
  const { setUserEmail, setIsAuth } = useContext(UserContext);

  useEffect(() => {
    const userEmail = localStorage.getItem('user');

    if (userEmail) {
      setUserEmail(userEmail);
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

import { BrowserRouter } from 'react-router-dom';
import ClientRoutes from 'ClientRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import UserContext from 'components/context/UserProvider';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from 'firebaseConfig';
import Loader from 'components/Loader';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserEmail, setIsAuth } = useContext(UserContext);
  const auth = getAuth(app);

  const fetchUser = useCallback(() => {
    try {
      setIsLoading(true);
      onAuthStateChanged(auth, user => {
        if (user) {
          setUserEmail(user.email);
          setIsAuth(true);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter basename="/users-firebase">
      <Header />
      {isLoading ? <Loader /> : <ClientRoutes />}
      <ToastContainer />
    </BrowserRouter>
  );
};

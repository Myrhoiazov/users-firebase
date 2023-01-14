import { createContext, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

const UserContext = createContext(null);

const USER_LOCAL_DATA = 'user';

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const auth = getAuth();

  const login = email => {
    if (email) {
      setIsAuth(true);
      setUserEmail(email);
      localStorage.setItem(USER_LOCAL_DATA, email);
      return;
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      console.log('User Logout');
    });
    setIsAuth(false);
    setUserEmail('');
    localStorage.removeItem(USER_LOCAL_DATA);
  };

  return (
    <UserContext.Provider
      value={{ isAuth, userEmail, login, logout, setIsAuth, setUserEmail }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

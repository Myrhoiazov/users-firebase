import { createContext, useState } from 'react';

const UserContext = createContext(null);

const USER_LOCAL_DATA = 'user'

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const login = email => {
    if (email) {
      setIsAuth(true);
      setUserEmail(email);
      localStorage.setItem(USER_LOCAL_DATA, email);
      return;
    }

    alert('Invalid password');
  };

  const logout = () => {
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

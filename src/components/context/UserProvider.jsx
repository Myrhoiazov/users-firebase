import { createContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const login = email => {
    if (email) {
      setIsAuth(true);
      setUserEmail(email);
      localStorage.setItem('isAuth', 'true');
      return;
    }

    alert('Invalid password');
  };

  const logout = () => {
    setIsAuth(false);
    setUserEmail('');
    localStorage.removeItem('isAuth');
  };

  return (
    <UserContext.Provider
      value={{ isAuth, userEmail, login, logout, setIsAuth }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

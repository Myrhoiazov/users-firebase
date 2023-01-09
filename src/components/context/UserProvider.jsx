import { createContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const login = (id, email) => {
    if (email.length) {
      setIsAuth(true);
      setUserEmail(email);
      localStorage.setItem('isAuth', isAuth);
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
    <UserContext.Provider value={{ isAuth, userEmail, login, logout, setIsAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

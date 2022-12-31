import { BrowserRouter } from 'react-router-dom';
import ClientRoutes from 'ClientRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

export const App = () => {
  return (
    <BrowserRouter basename="/users-firebase">
      <Header />
      <ClientRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
};

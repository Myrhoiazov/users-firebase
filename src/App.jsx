import { BrowserRouter } from 'react-router-dom';
import ClientRoutes from 'ClientRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Headers from './components/Headers';

export const App = () => {
  return (

      <BrowserRouter basename="/users-firebase/">
        <Headers />
        <ClientRoutes />
        <ToastContainer />
      </BrowserRouter>

  );
};

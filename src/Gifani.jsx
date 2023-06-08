import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Router';
import { Navbar } from './components/Navbar.jsx';

export const Gifani = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='max-w-full p-10 m-auto'>
          <Router />
        </div>
      </BrowserRouter>
    </>
  );
};

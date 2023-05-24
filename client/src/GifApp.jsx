import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export const GifApp = () => {
  const { user } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='max-w-full p-10 m-auto'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/login'
              element={user ? <Navigate to='/' /> : <Login />}
            />
            <Route
              path='/signup'
              element={user ? <Navigate to='/' /> : <Signup />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

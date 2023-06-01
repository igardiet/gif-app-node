import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { Home } from '../pages/Home';
import { useAuthContext } from '../hooks/useAuthContext';
import { Akira } from '../pages/Akira';
import { DragonBall } from '../pages/DragonBall';
import { Naruto } from '../pages/Naruto';

export const Router = () => {
      const { user } = useAuthContext();
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/akira' element={<Akira />} />
      <Route path='/dragonBall' element={<DragonBall />} />
      <Route path='/naruto' element={<Naruto />} />
      <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
      <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
    </Routes>
  );
};

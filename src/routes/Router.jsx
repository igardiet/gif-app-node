import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { Akira, DragonBall, Naruto, Login, Signup, Home } from '../pages';

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

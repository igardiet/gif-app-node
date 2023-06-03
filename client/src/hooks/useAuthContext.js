import { useContext } from 'react';
import { AuthContext } from '../context';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('useAuthContext must be used inside AuthContextProvider!');
  }
  return context;
};

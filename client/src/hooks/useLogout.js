import { useAuthContext } from './useAuthContext';
import { useGifsContext } from './useGifsContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchGifs } = useGifsContext();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    dispatchGifs({ type: 'SET_GIFS', payload: null });
  };
  return { logout };
};

import { useContext } from 'react';
import { GifsContext } from '../context';

export const useGifsContext = () => {
  const context = useContext(GifsContext);

  if (!context) {
    throw Error('Gif context must be used inside gifsContextProvider');
  }
  return context;
};

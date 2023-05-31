import { useEffect } from 'react';
import { useGifsContext } from '../hooks/useGifsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { GifDetails } from '../components/GifDetails';
import { GifForm } from '../components/GifForm';

export const Home = () => {
  const { gifs, dispatch } = useGifsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchGifs = async () => {
      let authorizationHeader = {};

      if (user && user.token) {
        authorizationHeader = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
      }
      const response = await fetch('http://localhost:3000/api/gifs', {
        ...authorizationHeader,
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_GIFS', payload: json });
      }
    };
    fetchGifs();
  }, [dispatch, user]);

  return (
    <>
      {user && <GifForm />}
      <div className='grid gap-10 grid-cols-4'>
        {gifs && gifs.map((gif) => <GifDetails key={gif._id} gif={gif} />)}
      </div>
    </>
  );
};

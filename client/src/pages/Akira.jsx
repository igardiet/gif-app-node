import { useContext, useEffect } from 'react';
import { GifsContext } from '../context/GifContext';
import { GifDetails } from '../components/GifDetails';

export const Akira = () => {
  const { fetchGifsByCategory, gifs } = useContext(GifsContext);

  useEffect(() => {
    fetchGifsByCategory('akira');
  }, []);

  return (
    <>
      <h2>Akira</h2>
      <div>
        {gifs &&
          gifs.map((gif) => {
            return <GifDetails key={gif._id} gif={gif} />;
          })}
      </div>
    </>
  );
};

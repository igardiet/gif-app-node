import { useContext, useEffect } from 'react';
import { GifsContext } from '../context/GifContext';
import { GifDetails } from '../components/GifDetails';

export const Naruto = () => {
  const { fetchGifsByCategory, gifs } = useContext(GifsContext);

  useEffect(() => {
    fetchGifsByCategory('naruto');
  }, []);

  return (
    <>
      <h2>Naruto</h2>
      <div>
        {gifs &&
          gifs.map((gif) => {
            return <GifDetails key={gif._id} gif={gif} />;
          })}
      </div>
      ;
    </>
  );
};

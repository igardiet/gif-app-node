import { useContext, useEffect } from 'react';
import { GifsContext } from '../context/GifContext';
import { GifDetails } from '../components/GifDetails';

export const DragonBall = () => {
  const { fetchGifsByCategory, gifs } = useContext(GifsContext);

  useEffect(() => {
    fetchGifsByCategory('dragonBall');
  }, []);

  return (
    <>
      <h2>Dragon Ball</h2>
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

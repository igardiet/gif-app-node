import { useContext, useEffect } from 'react';
import { GifsContext } from '../context';
import { GifDetails } from '../components';

export const DragonBall = () => {
  const { fetchGifsByCategory, gifs } = useContext(GifsContext);

  useEffect(() => {
    fetchGifsByCategory('dragonBall');
  }, []);

  return (
      <div className='grid gap-10 grid-cols-4'>
        {gifs &&
          gifs.map((gif) => {
            return <GifDetails key={gif._id} gif={gif} />;
          })}
      </div>
  );
};

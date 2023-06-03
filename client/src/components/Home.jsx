import { useEffect } from 'react';
import { useGifsContext } from '../hooks';

export const Home = () => {
  const { gifs, dispatch } = useGifsContext();

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/gifs');
        const json = await response.json();
        dispatch({ type: 'SET_GIFS', payload: json });
      } catch (error) {
        console.warn(error);
      }
    };

    fetchGifs();
  }, [dispatch]);

  const gifFile = {};
  gifs.forEach((gif) => {
    const { username } = gif;
    if (!gifFile[gif]) {
      gifFile[gif] = {};
    }
    if (!gifFile[gif][username]) {
      gifFile[gif][username] = [];
    }
    gifFile[gif][username].push(gif);
  });

  return (
    <>
      {Object.entries(gifFile).map(([gif, categoryGifs], index) => (
        <div key={gif + index}>
          <h2>{gif}</h2>
          {Object.entries(categoryGifs).map(([username, userGifs], index) => (
            <div key={username + index}>
              <h3>Uploaded by: {username}</h3>
              {userGifs.map((gif) => (
                <GifDetails gif={gif} key={gif._id} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

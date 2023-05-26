import { useEffect } from 'react';
import { useGifsContext } from '../hooks/useGifsContext';
import { GifDetails } from '../components/GifDetails';

export const Home = () => {
  const { gifs, dispatch } = useGifsContext();
console.log(gifs);
  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/gifs');
        const json = await response.json();
        dispatch({ type: 'SET_GIFS', payload: json });
      } catch (error) {
        console.log(error);
      }
    };

    fetchGifs();
  }, [dispatch]);

  const gifsByCategory = {};
  gifs.forEach((gif) => {
    const { category, username } = gif;
    if (!gifsByCategory[category]) {
      gifsByCategory[category] = {};
    }
    if (!gifsByCategory[category][username]) {
      gifsByCategory[category][username] = [];
    }
    gifsByCategory[category][username].push(gif);
  });

  return (
    <>
      {Object.entries(gifsByCategory).map(([category, categoryGifs], index) => (
        <div key={category + index}>
          <h2>{category}</h2>
          {Object.entries(categoryGifs).map(([username, userGifs], index) => (
            <div key={username + index}>
              <h3>Uploaded by: {username}</h3>
              {userGifs.map((gif) => (
                console.log(gif)
                // <div>
                //   <GifDetails gif={gif} key={gif._id} />
                // </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

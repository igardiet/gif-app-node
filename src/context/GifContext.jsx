import { createContext, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';

export const GifsContext = createContext();
export const gifsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GIFS':
      return {
        gifs: action.payload,
      };
    case 'CREATE_GIF':
      return {
        gifs: [action.payload, ...state.gifs],
      };
    case 'DELETE_GIF':
      return {
        gifs: state.gifs.filter((gif) => gif._id !== action.payload),
      };
    default:
      return state;
  }
};

export const GifsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gifsReducer, {
    gifs: null,
  });
  const { user } = useContext(AuthContext);

  const fetchGifs = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/api/gifs`
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'SET_GIFS', payload: json });
    }
  };

  const fetchGifsByCategory = async (category) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/api/gifs/category/${category}`
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'SET_GIFS', payload: json });
    }
  };

  const searchGifs = async (query) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/api/gifs/search/${query}`
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'SET_GIFS', payload: json });
    }
  };

  const editGif = async (gifId, newTitle) => {
    const gifData = { gifId, newTitle };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/gifs/edit`,
        {
          method: 'PUT',
          body: JSON.stringify(gifData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      if (data?.ok) {
        const updatedGifs = state.gifs.map((gif) => {
          if (gif._id === gifId) {
            return { ...gif, title: newTitle };
          } else {
            return gif;
          }
        });
        dispatch({ type: 'SET_GIFS', payload: updatedGifs });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <GifsContext.Provider
      value={{
        ...state,
        dispatch,
        fetchGifs,
        fetchGifsByCategory,
        searchGifs,
        editGif,
      }}
    >
      {children}
    </GifsContext.Provider>
  );
};

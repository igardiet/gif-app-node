import { createContext, useReducer } from 'react';

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

  return (
    <GifsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GifsContext.Provider>
  );
};

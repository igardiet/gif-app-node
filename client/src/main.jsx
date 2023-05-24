import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import { GifsContextProvider } from './context/GifContext';
import { CategoryContextProvider } from './context/CategoryContext';
import { GifApp } from './GifApp';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <GifsContextProvider>
      <CategoryContextProvider>
        <GifApp />
      </CategoryContextProvider>
    </GifsContextProvider>
  </AuthContextProvider>
);

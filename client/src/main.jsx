import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider, GifsContextProvider } from './context';
import { GifApp } from './GifApp';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <GifsContextProvider>
      <GifApp />
    </GifsContextProvider>
  </AuthContextProvider>
);

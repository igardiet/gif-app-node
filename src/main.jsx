import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider, GifsContextProvider } from './context';
import { Gifani } from './Gifani';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <GifsContextProvider>
      <Gifani />
    </GifsContextProvider>
  </AuthContextProvider>
);

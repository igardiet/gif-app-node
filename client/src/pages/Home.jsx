import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGifsContext, useAuthContext } from '../hooks';
import { GifDetails, AddGifModal } from '../components';
import { SearchBar } from '../components/SearchBar';

export const Home = () => {
  const { gifs, fetchGifs } = useGifsContext();
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const isSearchBarVisible = location.pathname === '/';

  useEffect(() => {
    fetchGifs();
  }, [user]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='flex'>
        {user && (
          <button className='btn btn-danger' onClick={handleModalOpen}>
            Add Gif
          </button>
        )}
        {isSearchBarVisible && <SearchBar />}
      </div>
      {isModalOpen && <AddGifModal onClose={handleModalClose} />}
      <div className='grid grid-cols-4'>
        {gifs && gifs.map((gif) => <GifDetails key={gif._id} gif={gif} />)}
      </div>
    </>
  );
};

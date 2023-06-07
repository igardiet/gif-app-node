import { useContext, useState } from 'react';
import { GifsContext } from '../context';

export const SearchBar = () => {
  const { searchGifs, fetchGifs } = useContext(GifsContext);
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const query = e.target.value;

    if (query.length < 1) {
      fetchGifs();
      return;
    }

    searchGifs(e.target.value);
  };
  return (
    <input
      className='w-[20%] ml-10 h-10 my-0 bg-white border-[#FC427B]'
      type='search'
      name='filter'
      value={query}
      placeholder='Search GIF'
      aria-label='Search'
      onChange={handleSearch}
    />
  );
};

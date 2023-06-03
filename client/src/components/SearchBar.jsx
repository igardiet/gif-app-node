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
      className='w-[15%] h-6 mb-0'
      type='search'
      name='filter'
      value={query}
      placeholder='Search'
      aria-label='Search'
      onChange={handleSearch}
    />
  );
};

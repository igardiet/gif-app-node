export const SearchBar = () => {
  return (
    <>
      <input
        className='w-[15%] h-6 mb-0'
        type='search'
        name='filter'
        // value={query}
        placeholder='Search'
        aria-label='Search'
        // onChange={handleInput}
      />
    </>
  );
};

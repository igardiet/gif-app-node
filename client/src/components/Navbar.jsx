import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { SearchBar } from './SearchBar';

export const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className='bg-black'>
      <div className='container max-w-full m-auto px-8 py-4 flex items-center justify-between'>
        <Link to='/'>
          <h1 className='no-underline text-white'>GifApp</h1>
        </Link>
        <div className='flex mr-22 items-center text-white'>
          <Link className='mx-8' to='/akira'>
            Akira
          </Link>
          <Link className='mx-8' to='/dragonball'>
            Dragon Ball
          </Link>
          <Link className='mx-8' to='/naruto'>
            Naruto
          </Link>
        </div>
        <SearchBar />
        <nav className='flex items-center'>
          {user && (
            <>
              <div className='flex items-center ml-auto'>
                <span className='text-white'>{user.email}</span>
                <button className='bg-white' onClick={handleClick}>
                  <span className='text-black'>Log out</span>
                </button>
              </div>
            </>
          )}
          {!user && (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

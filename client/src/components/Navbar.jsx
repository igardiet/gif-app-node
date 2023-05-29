import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className='bg-black'>
      <div className='container max-w-full m-auto px-8 py-4 flex items-center justify-between'>
        <Link className='no-underline text-white' to='/'>
          <h1>GifApp</h1>
        </Link>
        <nav className='flex items-center'>
          {user && (
            <>
              <div className='mr-[250px]'>
                <Link className='mx-[32px]' to='/akira'>
                  Akira
                </Link>
                <Link className='mx-[32px]' to='/dragonball'>
                  Dragon Ball
                </Link>
                <Link className='mx-[32px]' to='/naruto'>
                  Naruto
                </Link>
              </div>
              <div>
                <span className='text-white'>{user.email}</span>
                <button className='bg-white' onClick={handleClick}>
                  <span className='text-black'>Log out</span>
                </button>
              </div>
            </>
          )}
          {!user && (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

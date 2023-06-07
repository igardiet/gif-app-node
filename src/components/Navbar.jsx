import { Link } from 'react-router-dom';
import { useLogout, useAuthContext } from '../hooks';
import logo from '../assets/aniLogo.png';

export const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className='bg-[#303952]'>
      <div className='container max-w-full m-auto px-8 py-4 flex items-center justify-between'>
        <Link to='/'>
          <img src={logo} alt='App logo' className='h-10 w-15' />
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
        <nav className='flex items-center'>
          {user && (
            <>
              <div className='flex items-center ml-auto'>
                <span className='text-white'>{user.email}</span>
                <button
                  className='bg-[#FC427B] border-[#FC427B]'
                  onClick={handleClick}
                >
                  <span className='text-white'>Log out</span>
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

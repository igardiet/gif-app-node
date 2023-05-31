import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useGifsContext } from '../hooks/useGifsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

export const GifDetails = ({ gif }) => {
  const { dispatch } = useGifsContext();
  const { user } = useAuthContext();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (!user) {
      return;
    }

    if (window.confirm('Are you sure you want to delete this GIF?')) {
      try {
        setDeleting(true);
        const response = await fetch(
          'http://localhost:3000/api/gifs/' + gif._id,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          dispatch({ type: 'DELETE_GIF', payload: gif._id });
        } else {
          const json = await response.json();
          setError(json.error);
        }
      } catch (error) {
        setError('An error ocurred while deleting the GIF');
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div className='gif-details bg-black mx-auto my-8 p-4 relative rounded-xl w-64'>
      <div className='w-full h-48'>
        <img
          src={gif.img}
          alt='Gif'
          className='w-full h-full object-cover rounded'
        />
      </div>
      <p className='text-xs mt-4 text-white'>
        {formatDistanceToNow(new Date(gif.createdAt), { addSuffix: true })}
      </p>
      <div className='flex items-center justify-center'>
        <span className='flex cursor-pointer rounded-full bg-black'>
          <FaEdit className='text-[orange] mx-3 mt-4' />
          <FaTrashAlt className='text-[red] mx-3 mt-4' onClick={handleClick} />
        </span>
      </div>
      {deleting && <p className='text-black'>Deleting...</p>}
      {error && <p className='text-red'>{error}</p>}
    </div>
  );
};

import { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useGifsContext, useAuthContext } from '../hooks';

export const GifDetails = ({ gif }) => {
  const { dispatch, editGif } = useGifsContext();
  const { user } = useAuthContext();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(gif.title);

  const handleEditTitle = () => {
    editGif(gif._id, editValue);
    setIsEditing(false);
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }

    if (window.confirm('Are you sure you want to delete this GIF?')) {
      try {
        setDeleting(true);
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/api/gifs/${gif._id}`,
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
    <div className='gif-details bg-[#FC427B] mx-auto my-8 p-1 relative rounded-xl w-64 flex flex-col justify-between'>
      <span className='w-full h-48'>
        <img
          src={gif.img}
          alt='Gif'
          className='w-full h-full object-cover rounded'
        />
      </span>
      <span className='mt-2 p-2 bg-[#303952] rounded'>
        {isEditing ? (
          <input
            className='p-0'
            onBlur={handleEditTitle}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        ) : (
          <div className='scroll-container'>
            <p className='text-white scroll-text truncate'>{gif.title}</p>
          </div>
        )}
        <p className='text-white text-xs'>{gif.category}</p>
        <p className='text-xs pt-3 text-white'>
          {formatDistanceToNow(new Date(gif.createdAt), { addSuffix: true })}
        </p>
        <span className='flex items-center justify-center'>
          {user && (
            <span className='flex cursor-pointer rounded-full'>
              <FaEdit
                className='text-[orange] mx-3 mt-2'
                onClick={() => setIsEditing(true)}
              />
              <FaTrashAlt
                className='text-[red] mx-3 mt-2'
                onClick={handleClick}
              />
            </span>
          )}
        </span>
      </span>
      {deleting && <p className='text-black'>Deleting...</p>}
      {error && <p className='text-red'>{error}</p>}
    </div>
  );
};

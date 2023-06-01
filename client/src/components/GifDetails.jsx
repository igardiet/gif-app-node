import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useGifsContext, useAuthContext } from '../hooks';
import { useState } from 'react';

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
    <div className='gif-details bg-black mx-auto my-8 p-4 relative rounded-xl w-64 flex flex-col justify-between'>
      <div className='w-full h-48'>
        <img
          src={gif.img}
          alt='Gif'
          className='w-full h-full object-cover rounded'
        />
      </div>
      {isEditing ? (
        <input
          onBlur={handleEditTitle}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
      ) : (
        <p className='text-white truncate'>{gif.title}</p>
      )}
      <p className='text-white text-xs'>{gif.category}</p>
      <p className='text-xs mt-4 text-white'>
        {formatDistanceToNow(new Date(gif.createdAt), { addSuffix: true })}
      </p>
      <div className='flex items-center justify-center'>
        {user && (
          <span className='flex cursor-pointer rounded-full bg-black'>
            <FaEdit
              className='text-[orange] mx-3 mt-4'
              onClick={() => setIsEditing(true)}
            />
            <FaTrashAlt
              className='text-[red] mx-3 mt-4'
              onClick={handleClick}
            />
          </span>
        )}
      </div>
      {deleting && <p className='text-black'>Deleting...</p>}
      {error && <p className='text-red'>{error}</p>}
    </div>
  );
};

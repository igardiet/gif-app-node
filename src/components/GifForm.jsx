import { useState } from 'react';
import { useGifsContext, useAuthContext } from '../hooks';

export const GifForm = ({ onClose }) => {
  const { dispatch } = useGifsContext();
  const { user } = useAuthContext();
  //refactor
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState('naruto');
  const [title, setTitle] = useState('');
  ///
  const [error, setError] = useState(null);
  const [voidInput, setVoidInput] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in!');
      return;
    }

    const formData = new FormData();
    formData.append('img', img);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('email', user.email);

    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/api/gifs`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      }
    );

    const json = await response.json();
    if (!json.success) {
      setError(json.error);
      setVoidInput(json.voidInput);
    }
    if (json.success) {
      onClose();
      setImg(null);
      setError(null);
      setVoidInput([]);
      dispatch({ type: 'CREATE_GIF', payload: json.gif });
    }
  };

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <form className='mx-auto p-3 relative rounded-xl' onSubmit={handleSubmit}>
      <h2 className='text-2xl text-black mb-3'>Add a new GIF!</h2>
      <input
        className={voidInput.includes('img') ? 'error' : ''}
        type='file'
        name='img'
        id='img'
        accept='.gif'
        onChange={handleFileChange}
      />
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Gif title'
        required
      />
      <span className='flex p-3'>
        <select
          className='outline-none w-[20%] mx-10 cursor-pointer'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value='naruto'>
            Naruto
          </option>
          <option value='akira'>
            Akira
          </option>
          <option value='dragonBall'>
            Dragon Ball
          </option>
        </select>
        <button
          className={`bg-[#ff3f34] text-white cursor-pointer p-2 rounded ${
            !img ? 'disabled' : ''
          }`}
          type='submit'
          disabled={!img}
        >
          Upload
        </button>
        {!img && <p className='m-auto'>Select a GIF to continue!</p>}
      </span>
      {error && <p className='text-red'>{error}</p>}
    </form>
  );
};

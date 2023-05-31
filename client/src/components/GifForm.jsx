import { useState } from 'react';
import { useGifsContext } from '../hooks/useGifsContext';
import { useAuthContext } from '../hooks/useAuthContext';

export const GifForm = () => {
  const { dispatch } = useGifsContext();
  const { user } = useAuthContext();

  const [img, setImg] = useState(null);
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
    formData.append('email', user.email);

    const response = await fetch('http://localhost:3000/api/gifs', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });

    const json = await response.json();
    if (!json.success) {
      setError(json.error);
      setVoidInput(json.voidInput);
    }
    if (json.success) {
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
    <form
      className='gif-form mx-auto my-8 p-4 relative rounded-xl'
      onSubmit={handleSubmit}
    >
      <h2 className='text-2xl text-black mb-4'>Add a GIF</h2>
      <input
        className={voidInput.includes('img') ? 'error' : ''}
        type='file'
        name='img'
        id='img'
        accept='.gif'
        onChange={handleFileChange}
      />
      <button
        className='bg-black text-white cursor-pointer p-2 rounded'
        type='submit'
        disabled={!img}
      >
        Upload
      </button>
      {error && <p className='text-red'>{error}</p>}
      {/* {voidInput.map((_, index) => (
        <div key={index} className='mb-2'>
          <input type='text' value='' className='hidden' disabled />
        </div>
      ))} */}
    </form>
  );
};

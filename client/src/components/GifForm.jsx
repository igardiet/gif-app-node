import { useState } from 'react';
import { useGifsContext } from '../hooks/useGifsContext';
import { useAuthContext } from '../hooks/useAuthContext';

export const GifForm = () => {
  const { dispatch } = useGifsContext();
  const { user } = useAuthContext();

  const [category, setCategory] = useState('');
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
    formData.append('category', category);
    formData.append('img', img);
    formData.append('email', user.email);

    // const response = await fetch('http://localhost:3000/api/gifs', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // });

    // const gif = {category, img };
    const response = await fetch('http://localhost:3000/api/gifs', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: formData,
    });
    
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      setError(json.error);
      setVoidInput(json.voidInput);
    }
    if (json.success) {
      setCategory('');
      setImg(null);
      setError(null);
      setVoidInput([]);
      dispatch({ type: 'CREATE_GIF', payload: json.gif });
    }
  };

  return (
    <form className='p-6' onSubmit={handleSubmit}>
      <h3 className='text-black'>Upload a new gif!</h3>
      <input
        placeholder='Category'
        type='text'
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={voidInput.includes('category') ? 'error' : ''}
      />
      <input
        placeholder='Image'
        type='file'
        onChange={(e) => setImg(e.target.files[0])}
        className={voidInput.includes('img') ? 'error' : ''}
      />
      <button className='bg-black text-white cursor-pointer border-none p-2.5 rounded'>
        Add Gif!
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

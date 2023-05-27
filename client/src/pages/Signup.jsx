import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <input
        placeholder='Email'
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        placeholder='Password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        disabled={isLoading}
        className='bg-black text-white cursor-pointer border-none p-2.5 rounded'
      >
        Sign up
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

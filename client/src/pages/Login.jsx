import { useState } from 'react';
import { useLogin } from '../hooks';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className='login' onSubmit={handleSubmit}>
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
        className='bg-[#ff3f34] text-white cursor-pointer border-none p-2.5 rounded'
      >
        Log in
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

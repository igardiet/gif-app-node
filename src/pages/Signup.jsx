import { useState } from 'react';
import { useSignup } from '../hooks';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
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
        minLength={'8'}
        maxLength={'21'}
      />
      <input
        placeholder='Confirm password'
        type='password'
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />
      <button
        disabled={isLoading}
        className='bg-[#ff3f34] text-white cursor-pointer border-none p-2.5 rounded'
      >
        Sign up
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupDialog: React.FC<SignupDialogProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    console.log('Signing up with', { email, password });
  
    onClose(); 
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    
    if (provider === 'google') {
      window.location.href = '/api/auth/google'; // for auth setup
    } else if (provider === 'facebook') {
      window.location.href = '/api/auth/facebook'; 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Sign Up</h2>
          <button className="text-gray-600 hover:text-black" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} aria-label="Close" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md border hover:bg-white hover:border-black hover:text-black"
          >
            Sign Up
          </button>
        </form>
        <div className="flex flex-col items-center mt-4 gap-2">
          <p className="text-sm text-gray-600">Or sign up with:</p>
          <div className="flex gap-4">
            <button
              className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={() => handleSocialLogin('facebook')}
            >
              <FontAwesomeIcon icon={faFacebook} className="mr-2" />
              Facebook
            </button>
            <button
              className="flex items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              onClick={() => handleSocialLogin('google')}
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Google
            </button>
          </div>
          </div>
      </div>
    </div>
  );
};

export default SignupDialog;

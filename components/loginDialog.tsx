'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import SignupDialog from './SignupDialog'; 
interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Logging in with', { email, password });
    router.push('/dashboard');
    onClose(); 
  };

  const handleSignupClick = () => {
    setIsSignupDialogOpen(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Login</h2>
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
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 border rounded-md hover:bg-white hover:text-black hover:border-black"
            >
              Login
            </button>
            <p className="mt-4 text-sm text-gray-600">
              Don't have an account?{' '}
              <button onClick={handleSignupClick} className="text-blue-500 hover:underline">
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>

      <SignupDialog 
        isOpen={isSignupDialogOpen} 
        onClose={() => setIsSignupDialogOpen(false)} 
      />
    </>
  );
};

export default LoginDialog;

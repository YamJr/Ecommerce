'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useMutation, gql } from '@apollo/client';

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}


const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    createCustomer(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
      }
    ) {
      customer {
        firstname
        lastname
        email
      }
    }
  }
`;

const SignupDialog: React.FC<SignupDialogProps> = ({ isOpen, onClose }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [createCustomer, { loading, error: mutationError }] = useMutation(CREATE_CUSTOMER, {
    onCompleted: (data) => {
      console.log('Registration successful:', data);
      onClose(); 
      router.push('/'); 
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null); 

    try {
      console.log('Submitting data:', { firstname, lastname, email, });
     
      await createCustomer({
        variables: {
          firstname,
          lastname,
          email,
          password,
        },
      });
    } catch (err) {
      console.error('Error during registration:', err);
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
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              id="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            />
          </div>
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
          {mutationError && <p className="text-red-500 text-sm mb-4">{mutationError.message}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md border hover:bg-white hover:border-black hover:text-black"
            disabled={loading} 
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupDialog;

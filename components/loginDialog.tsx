// 'use client';
// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';
// import { gql, useMutation ,useQuery} from '@apollo/client'; 
// import SignupDialog from '../components/SignupDialog'
// import {useCart} from '../hooks/useCart'
// import {GET_CUSTOMER_CART} from '../graphql/getCustomerCart'

// interface LoginDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onLoginSuccess: () => void;
//   refetch: () => void;
// }

// const LOGIN_MUTATION = gql`
//   mutation generateCustomerToken($email: String!, $password: String!) {
//     generateCustomerToken(email: $email, password: $password) {
//       token
//     }
//   }
// `;

// const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose, onLoginSuccess, refetch }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
//   const {handleMergeCarts} = useCart();
//   const { refetch: refetchCustomerCart } = useQuery(GET_CUSTOMER_CART, {
//     skip: true, 
//   });
//   const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
//     onCompleted: async(data) => {
    
//       const token = data.generateCustomerToken.token;
//       const expirationTime = Date.now() + 60 * 60 * 1000;
//       localStorage.setItem('customerToken', token);
//       localStorage.setItem('tokenExpiration', expirationTime.toString());
//       // console.log("token is ", token);
      
//       const { data: cartData } = await refetchCustomerCart();
//       if (cartData?.customerCart) {
//         const userCartId = cartData.customerCart.id;
//         const guestCartId = localStorage.getItem('cartId');
//         // console.log("guest id is ",guestCartId);
//         // console.log("customer cart id is",userCartId);
//         if (guestCartId && guestCartId !== userCartId) {
//           try {
//             await handleMergeCarts(guestCartId, userCartId);
//             localStorage.removeItem('cartId'); 
//           } catch (mergeError) {
//             console.error("Error merging carts:", mergeError);
//           }
//         }
//         localStorage.setItem('cartId', userCartId);
// console.log("Updated cartId in localStorage:", localStorage.getItem('cartId'));

//       }
//       refetch();
//       onLoginSuccess();
//       onClose();
//     },
//     onError: (err) => {
//       console.error('Login error:', err);
//     }
//   });

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     console.log('Logging in with', { email, password });

//     const existingToken = localStorage.getItem('customerToken');
//   const tokenExpiration = localStorage.getItem('tokenExpiration');
//   const currentTime = Date.now();

//   if (existingToken && tokenExpiration && currentTime < parseInt(tokenExpiration, 10)) {
//     // console.log('Valid token found, skipping login mutation.');
//     refetch();
//     onLoginSuccess();
//     onClose();
//   } else {
  
//     login({
//       variables: {
//         email,
//         password,
//       },
//     });
//   }
//   };
//   const handleSignup = () => {
//         setIsSignupDialogOpen(true);
//       };
  
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold">Login</h2>
//           <button className="text-gray-600 hover:text-black" onClick={onClose}>
//             <FontAwesomeIcon icon={faXmark} aria-label="Close" />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
//             />
//           </div>
//           {error && <p className="text-red-500">Login failed: {error.message}</p>}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 px-4 border rounded-md hover:bg-white hover:text-black hover:border-black"
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//           <p className="mt-4 text-sm text-gray-600">
//             Don't have an account?{' '}
//             <button className="text-blue-500 hover:underline" onClick={handleSignup}>
//               Sign Up
//             </button>
//           </p>
//         </form>
//       </div>
//       <SignupDialog 
//     isOpen={isSignupDialogOpen} 
//     onClose={() => setIsSignupDialogOpen(false)} 
//   />
//     </div>
//   );
// };

// export default LoginDialog;



'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { gql, useMutation, useQuery } from '@apollo/client'; 
import SignupDialog from '../components/SignupDialog';
import { useCart } from '../hooks/useCart';
import { GET_CUSTOMER_CART } from '../graphql/getCustomerCart';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  refetch: () => void;
}

const LOGIN_MUTATION = gql`
  mutation generateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose, onLoginSuccess, refetch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const { handleMergeCarts } = useCart();
  const { refetch: refetchCustomerCart } = useQuery(GET_CUSTOMER_CART, { skip: true });
  
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data) => {
      const token = data.generateCustomerToken.token;
      const expirationTime = Date.now() + 60 * 60 * 1000;
      localStorage.setItem('customerToken', token);
      localStorage.setItem('tokenExpiration', expirationTime.toString());

      const { data: cartData } = await refetchCustomerCart();
      if (cartData?.customerCart) {
        const userCartId = cartData.customerCart.id;
        const guestCartId = localStorage.getItem('cartId');

        if (guestCartId && guestCartId !== userCartId) {
          try {
            await handleMergeCarts(guestCartId, userCartId);
            localStorage.removeItem('cartId'); 
          } catch (mergeError) {
            console.error("Error merging carts:", mergeError);
          }
        }
        localStorage.setItem('cartId', userCartId);
      }

      refetch();
      onLoginSuccess();
      onClose();
    },
    onError: (err) => {
      console.error('Login error:', err);
    }
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const existingToken = localStorage.getItem('customerToken');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const currentTime = Date.now();

    if (existingToken && tokenExpiration && currentTime < parseInt(tokenExpiration, 10)) {
      refetch();
      onLoginSuccess();
      onClose();
    } else {
      login({ variables: { email, password } });
    }
  };

  const handleSignup = () => setIsSignupDialogOpen(true);

  if (!isOpen) return null;

  return (
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
          {error && <p className="text-red-500">Login failed: {error.message}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 border rounded-md hover:bg-white hover:text-black hover:border-black transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <button className="text-blue-500 hover:underline" onClick={handleSignup}>
              Sign Up
            </button>
          </p>
        </form>
      </div>
      <SignupDialog isOpen={isSignupDialogOpen} onClose={() => setIsSignupDialogOpen(false)} />
    </div>
  );
};

export default LoginDialog;

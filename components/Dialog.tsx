// components/CartDialog.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface RootState {
  cart: CartItem[];
}

interface CartDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dialog: React.FC<CartDialogProps> = ({ isOpen, onClose }) => {
  const cart = useSelector((state: RootState) => state.cart);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Cart Items</h2>
          <button
            className="text-gray-600 hover:text-black"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faShoppingCart} aria-label="Close" />
          </button>
        </div>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="mb-4 border-b pb-2">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>{item.description}</p>
                    <p className="text-gray-600">${item.price} x {item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Dialog;

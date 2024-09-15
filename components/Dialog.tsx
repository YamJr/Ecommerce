// 'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { incrementQuantity, decrementQuantity, removeItem } from '../store/cartSlice';
import { useRouter } from 'next/navigation'; 

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
  const dispatch = useDispatch();
  const router = useRouter(); 

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem({ id }));
  };

  const handleViewProductDetail = (id: number) => {
    router.push(`/product/${id}`);
    onClose(); 
  };

  const handleProceedToCheckout = () => {
    router.push('/checkout');
    onClose(); 
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <div className='flex items-center'>
          <h2 className="text-xl font-bold">Cart Items</h2>
          {cart.length > 0 && (
              <span className="ml-2 text-gray-600 text-sm">({totalQuantity} items)</span>
            )}
            </div>
          <button className="text-gray-600 hover:text-black" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} aria-label="Close" />
          </button>
        </div>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="mb-4 border-b pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover mr-4"
                      onClick={() => handleViewProductDetail(item.id)}
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p>{item.description}</p>
                      <p className="text-gray-600">${item.price}</p>
                      <div className="flex items-center mt-2">
                        <button
                          className="border border-gray-300 px-2 text-gray-600 hover:text-black"
                          onClick={() => handleDecrement(item.id)}
                        >
                          <FontAwesomeIcon icon={faMinus} aria-label="Decrement" />
                        </button>
                        <span className="px-3 font-medium border border-gray-300">{item.quantity}</span>
                        <button
                          className="border border-gray-300 px-2 text-gray-600 hover:text-black"
                          onClick={() => handleIncrement(item.id)}
                        >
                          <FontAwesomeIcon icon={faPlus} aria-label="Increment" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-black"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} aria-label="Delete" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}

        {cart.length > 0 && (
          <button
            className="capitalize mt-4 px-4 py-2 bg-black text-white border hover:bg-white hover:border-black hover:text-black font-bold"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Dialog;

import React from 'react';
import Link from 'next/link';
import { useAppDispatch } from '../store/hook'; 
import { addToCart } from '../store/cartSlice';

interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Product: React.FC<ProductData> = ({ id, name, description, price, image }) => {
  const dispatch = useAppDispatch();

  const product = { id, name, description, price, image };

  return (
    <div className="relative container my-10 max-w-md group">
      <div className="border border-gray-200 h-auto shadow-lg shadow-grey-900/15 relative overflow-hidden">
        <Link href={`/product/${id}`} passHref>
            <img src={image} alt={name} className="bg-gray-200 w-full object-cover cursor-pointer" />
            <div className="text-center py-3">
              <h4 className="font-semibold text-xl capitalize">{name}</h4>
              <p className="text-sm text-gray-700">{description}</p>
              <span className="block mt-2 font-bold text-lg">${price.toFixed(2)}</span>
            </div>
        </Link>
        <div className="h-9 flex items-center justify-center">
          <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="bg-black text-white font-semibold py-2 px-4 rounded-full mb-2 hover:bg-gray-800 transition-colors"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

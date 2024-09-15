'use client';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity:number;
}

const ProductDetail: React.FC<{ product: Product }> = ({ product }) => {
  const sizes = [40, 41, 42, 43, 44, 45, 46, 48];
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (selectedSize === null) {
      alert('Please select a size');
      return;
    }
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      // quantity:product.quantity,
    }));
  };

  return (
    <div className="container max-w flex  gap-10 justify-center items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-[45%] object-cover bg-gray-100 border border-gray-300 m-5"
      />
      <div className="text-left py-3 al">
        <h4 className="font-semibold text-[36px] capitalize">{product.name}</h4>
        <p className="text-[24px] text-gray-700">{product.description}</p>
        <span className="block mt-2 font-bold text-[34px]">
          ${product.price.toFixed(2)}
        </span>

        <div className="space-y-2 mt-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Select Size</h3>
            <a href="#" className="text-sm text-gray-500">Size Guide</a>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-3 border rounded-lg ${
                  selectedSize === size
                    ? 'bg-black text-white'
                    : 'bg-white text-black border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className='flex flex-row items-center gap-7'>
            <button className='capitalize my-8 border bg-black text-white py-2 px-10 hover:bg-white hover:text-black hover:border-black font-bold' onClick={handleAddToCart}>add to cart</button>
            <FontAwesomeIcon icon={faHeart} className='size-6 text-gray-500 hover:text-red-500'/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

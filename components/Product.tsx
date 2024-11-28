import React from 'react';
import Link from 'next/link'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useCart } from '../hooks/useCart'; 

interface Product {
  uid: string;
  name: string;
  sku: string;
  url_key: string;
  image: { url: string };
  price_range: {
    minimum_price: {
      final_price: {
        value: number;
        currency: string;
      };
    };
  };
}

interface ProductListProps {
  products: Product[];
}
const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { cartId, handleAddToCart, handleRemoveFromCart } = useCart();
  console.log('cart id  is here' ,cartId);
  return (
    <div className='container flex flex-col justify-center text-center'>
      <div className="grid grid-cols-4 gap-4">
        {products?.map((product) => (
          <div key={product.uid} className="border p-4 relative">
            <Link href={`/products/${product.url_key}`} passHref>
            {/* <Link href={`/products/${product.sku}`} passHref> */}
              <img src={product.image.url} alt={product.name} className="cursor-pointer" />
              <h2 className="cursor-pointer">{product.name}</h2>
              <p>
                {product.price_range?.minimum_price?.final_price.value}{' '}
                {product.price_range?.minimum_price?.final_price.currency}
              </p>
            </Link>
            
            <div className="h-9 flex items-center justify-center mt-2">
              <button
                className="bg-black text-white font-semibold py-2 px-4 rounded-full mb-2 hover:bg-gray-800 transition-colors mr-2"
                onClick={() => {
                  if (cartId) { 
                    handleAddToCart(product.sku) 
                      .then(() => {
                        console.log('Added to cart:', product.name);
                      })
                      .catch((error) => {
                        console.error('Error adding to cart:', error);
                      });
                  } else {
                    console.error('Cart ID is null. Cannot add to cart.');
                  }
                }}
              >
                Add to Cart
              </button>
              {/* <span
                className={`cursor-pointer text-gray-400 absolute top-5 right-6 z-10`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (cartId) { 
                    handleRemoveFromCart(product.sku) 
                      .then(() => {
                        console.log('Removed from cart:', product.name);
                      })
                      .catch((error) => {
                        console.error('Error removing from cart:', error);
                      });
                  } else {
                    console.error('Cart ID is null. Cannot remove from cart.');
                  }
                }}
              >
                <FontAwesomeIcon icon={faHeart} className='size-6' />
              </span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

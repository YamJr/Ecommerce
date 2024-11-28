'use client';

import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT_DETAILS } from '../../../graphql/product';
import { ADD_TO_CART } from '../../../graphql/addToCart';
import { useCart } from '../../../hooks/useCart';  

const ProductDetailPage = ({ params }: any) => {
  const { url_key } = params;

  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { url_key },
    skip: !url_key,
  });

  const { cartId } = useCart();  
  const [addToCartMutation] = useMutation(ADD_TO_CART);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching product details: {error.message}</p>;

  const product = data?.products?.items[0];
  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = async () => {
    try {
      if (!cartId) {
        throw new Error('Cart ID is missing');
      }

      await addToCartMutation({
        variables: {
          cartId,  
          cartItems: [{ sku:product.sku, quantity: 1 }],
        },
      });

      alert('Product added to cart successfully!');
    } catch (e) {
      console.error('Error adding to cart:', e);
    }
  };

  return (
    <div className="container">
      <div className='flex gap-4'>
        <div>
          <img src={product.image.url} alt={product.name} className='h-[500px] w-[500px]' />
          <div className='media-gallery flex gap-4 mt-3'>
            {product.media_gallery.map((image: any) => (
              <img key={image.url} src={image.url} alt={image.label || product.name} className='max-w-[150px] h-auto' />
            ))}
          </div>
        </div>
        <div>
          <p>{product.name}</p>
          <p>
            Price: {product.price_range?.minimum_price?.regular_price?.value} {product.price_range?.minimum_price?.regular_price?.currency}
          </p>
          <p>Status: {product.stock_status}</p>

          <button
            className="bg-black text-white font-semibold py-2 px-4 rounded-full mb-2 hover:bg-gray-800 transition-colors mr-2 mt-4"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

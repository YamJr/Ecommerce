'use client';
import {  useEffect , useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useCart } from '../../hooks/useCart';
import { PLACE_ORDER } from '../../graphql/placeOrder';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CART_DETAILS } from '../../graphql/getCartItems';
import { SHIPPING_ADDRESSES } from '../../graphql/setShippingAddresses';
import { BILLING_ADDRESSES } from '../../graphql/setBillingAddresses';
import { SHIPPING_METHODS } from '../../graphql/setShippingMethod';
import { PAYMENT_METHOD } from '../../graphql/setPaymentMethod';

interface CartItem {
  uid: string;
  quantity: number;
  product: {
    name: string;
    sku: string;
    url_key: string;
    image: {
      url: string;
    };
    price_range: {
      minimum_price: {
        final_price: {
          value: number;
          currency: string;
        };
      };
    };
  };
}

const CheckoutPage = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [country  , setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [regionId , setRegionId] = useState('');
  const [postalCode , setPostalCode]= useState('');

  const [paymentMethodCode, setPaymentMethodCode] = useState('');
  const [shippingMethodCode, setShippingMethodCode] = useState('');
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [billingFirstName, setBillingFirstName] = useState('');
  const [billingLastName, setBillingLastName] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [billingStreet , setBillingStreet] = useState('');
  const [billingRegionId , setBillingRegionId]= useState('');
  const [billingPostalCode, setBillingPostalCode]= useState('');
  const [billingPhoneNumber, setBillingPhoneNumber]= useState('');

  const router = useRouter();
  const { cartId, handleRemoveFromCart, handleUpdateCartItem } = useCart();

  
  const { data, loading, error , refetch } = useQuery(GET_CART_DETAILS, {
    variables: { cartId },
    skip: !cartId,
  });

  const cartItems: CartItem[] = data?.cart.itemsV2.items || [];
  const [placeOrder] = useMutation(PLACE_ORDER);
  const [setShippingAddress] = useMutation(SHIPPING_ADDRESSES);
  const [setBillingAddress] = useMutation(BILLING_ADDRESSES);
  const [setShippingMethods] = useMutation(SHIPPING_METHODS);
  const [setPaymentMethod] = useMutation(PAYMENT_METHOD);
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  const handleContinueShopping = () => {
    router.back();
  };

  useEffect(() => {
    const initialQuantities: Record<string, number> = {};
    cartItems.forEach(item => {
      initialQuantities[item.uid] = item.quantity;
    });
  
 
    if (JSON.stringify(initialQuantities) !== JSON.stringify(itemQuantities)) {
      setItemQuantities(initialQuantities);
    }
  }, [cartItems, itemQuantities]); 
  
  const handleIncrement = async (itemId: string) => {
    const currentQuantity = itemQuantities[itemId];
    const newQuantity = currentQuantity + 1; // Increment the quantity
    await handleUpdateCartItem(itemId, newQuantity); // Pass the new quantity
    setItemQuantities(prev => ({ ...prev, [itemId]: newQuantity }));
     refetch();
  };
  
  const handleDecrement = async (itemId: string) => {
    const currentQuantity = itemQuantities[itemId];
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1; // Decrement the quantity
      await handleUpdateCartItem(itemId, newQuantity); // Pass the new quantity
      setItemQuantities(prev => ({ ...prev, [itemId]: newQuantity }));
      refetch(); // Update local state
    } else {
      // Handle removal or show a message if needed
 
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentMethodCode || !shippingMethodCode) {
      alert('Please select both a shipping method and a payment method');
      return;
    }

    try {

      await setShippingAddress({
        variables: {
          cartId,
          shippingAddress: {
            firstname: firstName,
            lastname: lastName,
            city,
            country_code:country, 
            street : [street],
            telephone: phoneNumber,
            region_id: regionId,
            postcode: postalCode,
          },
        },
      });

      if (!sameAsShipping) {
        await setBillingAddress({
          variables: {
            cartId,
            billingAddress: {
              firstname: billingFirstName,
              lastname: billingLastName,
              city: billingCity,
              country_code:billingCountry,
              postcode: billingPostalCode,
              region_id: billingRegionId,
              street: [billingStreet],
              telephone: billingPhoneNumber,

            },
            sameAsShipping,
          },
        });
      }

      
      await setShippingMethods({
        variables: {
          cartId,
          shippingMethods: [
            {
              carrier_code: shippingMethodCode, 
              method_code: shippingMethodCode,   
            },
          ],
        },
      });

     
      await setPaymentMethod({
        variables: {
          cartId,
          paymentMethodCode,
        },
      });

      const orderVariables = {
        cartId,
        paymentMethod: paymentMethodCode,
        shippingMethod: shippingMethodCode, 
      };

      const { data } = await placeOrder({
        variables: orderVariables,
      });
      console.log("Order Variables:", orderVariables);


      if (data.placeOrder.errors.length > 0) {
        alert('Order failed: ' + data.placeOrder.errors[0].message);
      } else {
        alert('Order placed successfully! Order Number: ' + data.placeOrder.orderV2.number);
        router.push('/');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading cart: {error.message}</p>;

  return (
    <div className="container flex flex-col lg:flex-row justify-between py-12">
      <div className="w-full lg:w-3/5 mr-9">
        <h2 className="text-2xl font-semibold">Checkout</h2>
        <div className="mt-4">
          {cartItems.map((item) => (
            <div key={item.uid} className="flex items-center justify-between py-4 border-b">
              <img src={item.product.image.url} alt={item.product.name} className="w-24 h-24 object-cover" />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.product.name}</h3>
              </div>
              <div className="flex items-center mr-3">
                <button onClick={() => handleDecrement(item.uid)} className="border border-gray-300 px-2 text-gray-600 hover:text-black">
                  <FontAwesomeIcon icon={faMinus} aria-label="Decrease quantity" />
                </button>
                {/* <span className="mx-2">{item.quantity}</span> */}
                <span className="mx-2">{itemQuantities[item.uid]}</span>
                <button onClick={() => handleIncrement(item.uid)} className="border border-gray-300 px-2 text-gray-600 hover:text-black">
                  <FontAwesomeIcon icon={faPlus} aria-label="Increase quantity" />
                </button>
                <button
                  className="border border-gray-300 px-2 text-gray-600 hover:text-black ml-2"
                  onClick={() => {
                    if (cartId) {
                      handleRemoveFromCart(item.uid);
                    } else {
                      console.error("Error: cartId is null");
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} aria-label="Delete" />
                </button>
              </div>
              <p className="text-lg font-semibold">${item.product.price_range?.minimum_price?.final_price?.value.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-4 flex justify-between items-center border-t pt-4">
            <h3 className="text-xl font-semibold">Total</h3>
            <p className="text-lg font-bold">${cartItems.reduce((total, item) => total + (item.product.price_range.minimum_price.final_price.value * item.quantity), 0).toFixed(2)}</p>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <li className="py-2 text-blue-700 underline list-none hover:cursor-pointer" onClick={handleContinueShopping}>
              Continue Shopping?
            </li>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold capitalize mb-6">Shipping Address</h3>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Telephone</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
    Region
  </label>
  <select
    id="region"
    value={regionId}
    onChange={(e) => setRegionId(e.target.value)} 
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    required
  >
    <option value="">Select a region</option>
     <option value='1'>US</option>
     <option value='2'>NY</option>
     <option value='3'>CA</option>
  </select>
</div>

<div className="mb-4">
  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
    Postal Code
  </label>
  <input
    type="text" 
    id="postalCode"
    value={postalCode} 
    onChange={(e) => setPostalCode(e.target.value)} 
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    required
  />
</div>

            <h3 className="text-xl font-semibold capitalize mb-6">Billing Address</h3>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="sameAsShipping"
                checked={sameAsShipping}
                onChange={(e) => setSameAsShipping(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="sameAsShipping" className="text-sm font-medium text-gray-700">Same as shipping address</label>
            </div>
            {!sameAsShipping && (
              <>
                <div className="mb-4">
                  <label htmlFor="billingFirstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    id="billingFirstName"
                    value={billingFirstName}
                    onChange={(e) => setBillingFirstName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="billingLastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    id="billingLastName"
                    value={billingLastName}
                    onChange={(e) => setBillingLastName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    id="billingCity"
                    value={billingCity}
                    onChange={(e) => setBillingCity(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
              <label htmlFor="billingcountry" className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                id="billingCountry"
                value={billingCountry}
                onChange={(e) => setBillingCountry(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="billingstreet" className="block text-sm font-medium text-gray-700">Street</label>
              <input
                type="text"
                id="billingStreet"
                value={billingStreet}
                onChange={(e) => setBillingStreet(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="billingPhoneNumber" className="block text-sm font-medium text-gray-700">Telephone</label>
              <input
                type="tel"
                id="billingPhoneNumber"
                value={billingPhoneNumber}
                onChange={(e) => setBillingPhoneNumber(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
  <label htmlFor="billingregion" className="block text-sm font-medium text-gray-700">
    Region
  </label>
  <select
    id="billingRegion"
    value={billingRegionId}
    onChange={(e) => setBillingRegionId(e.target.value)} 
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    required
  >
    <option value="">Select a region</option>
     <option value='1'>US</option>
     <option value='2'>NY</option>
     <option value='3'>CA</option>
  </select>
</div>

<div className="mb-4">
  <label htmlFor="billingpostalCode" className="block text-sm font-medium text-gray-700">
    Postal Code
  </label>
  <input
    type="text" 
    id="billingpostalCode"
    value={billingPostalCode} 
    onChange={(e) => setBillingPostalCode(e.target.value)} 
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    required
  />
</div>

              </>
            )}

            <h3 className="text-xl font-semibold capitalize mb-6">Shipping Method</h3>
            <select
              value={shippingMethodCode}
              onChange={(e) => setShippingMethodCode(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              required
            >
              <option value="">Select Shipping Method</option>
              <option value="flatrate">Flat Rate</option>
              <option value="flatrate">Free Shippping</option>
            </select>

            <h3 className="text-xl font-semibold capitalize mb-6">Payment Method</h3>
            <select
              value={paymentMethodCode}
              onChange={(e) => setPaymentMethodCode(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              required
            >
              <option value="">Select Payment Method</option>
              <option value="cod">Cash on Delivery</option>
              <option value="paypal">Pay pal</option>
              <option value="checkmo">Check / Money order</option>
            </select>

            <button
              type="submit"
              className="w-full mt-6 py-2 bg-black text-white rounded-md border hover:bg-white hover:border-black hover:text-black transition duration-200"
            >
              Place Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;


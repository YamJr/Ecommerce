'use client';
import { useAppDispatch } from '../../store/hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux'; 
import { RootState } from '../../store/store';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'; 
import { incrementQuantity, decrementQuantity, removeItem } from '../../store/cartSlice'; 
const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  return (
    <div className="container flex flex-col lg:flex-row justify-between py-12">
      <div className="w-full lg:w-3/5 mr-9">
        <h2 className="text-2xl font-semibold">Checkout</h2>
        <div className="mt-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <select className="border p-2">
                {/* Map over available sizes */}
                <option>{item.size || 'Select Size'}</option>
              </select>
              <div className="flex items-center">
                <button
                  className="text-lg px-2"
                  onClick={() => dispatch(decrementQuantity(item.id))}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="text-lg px-2"
                  onClick={() => dispatch(incrementQuantity(item.id))}
                >
                  +
                </button>
              </div>
              <p className="text-lg font-semibold">${item.price}</p>
              <button
                className="ml-4 text-gray-400 hover:text-black"
                onClick={() => dispatch(removeItem({ id: item.id }))}
              >
                <FontAwesomeIcon icon={faTrashCan} aria-label="Delete" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
  <h3 className="text-xl font-semibold capitalize">Payment Info</h3>
  <div className="p-4 bg-gray-100 rounded-md mt-4">
    <div>
      <p className='font-semibold'>Payment Method:</p>
      <div className="flex space-x-4 mt-2">
        <label>
          <input type="radio" name="paymentMethod" value="creditCard" />
          Credit Card
        </label>
        <label>
          <input type="radio" name="paymentMethod" value="paypal" />
          PayPal
        </label>
      </div>
    </div>
    <div className="mt-4">
      <label className='font-semibold'>Name On Card:</label>
      <input type="text" className="border p-2 w-full mt-2" placeholder="Your Name" />
    </div>
    <div className="mt-4">
      <label className='font-semibold'>Card Number:</label>
      <input type="text" className="border p-2 w-full mt-2" placeholder="**** **** **** 2153" />
    </div>
    <div className="flex flex-col mt-4">
      <div className="flex flex-row">
        <div className="flex flex-col mr-4">
          <label className="mb-1 font-semibold">Expiration Date:</label>
          <div className="flex">
            <select className="border p-2">
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
            </select>
            <select className="border p-2 ml-2">
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">CVV:</label>
          <input type="text" className="border p-2" placeholder="156" />
        </div>
      </div>
    </div>
    <div className="flex flex-col mt-4">
      <label className='font-semibold'>Discount Code:</label>
      <input type="text" className="border p-2 w-full" placeholder="Enter discount code" />
    </div>
  </div>
  <div className="mt-8">
    <button className="bg-black text-white w-full p-3 rounded-md hover:bg-white border hover:text-black hover:border-black">Check Out</button>
  </div>
</div>

    </div>
  );
};

export default CheckoutPage;

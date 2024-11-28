// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMinus,
//   faPlus,
//   faTrashCan,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import { useRouter } from "next/navigation";
// import { useQuery, useMutation } from "@apollo/client";
// import { GET_CUSTOMER_CART } from "../graphql/getCustomerCart";
// import { REMOVE_FROM_CART } from "../graphql/removeFromCart";
// import { UPDATE_CART_ITEMS } from "../graphql/updateCartItems"; 

// interface CartItem {
//   uid: string;
//   quantity: number;
//   product: {
//     name: string;
//     sku: string;
//     url_key: string;
//     image: {
//       url: string;
//     };
//     price_range: {
//       minimum_price: {
//         final_price: {
//           value: number;
//           currency: string;
//         };
//       };
//     };
//   };
// }

// interface CartDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   cartId: string;
// }

// const Dialog: React.FC<CartDialogProps> = ({ isOpen, onClose, cartId }) => {
//   const router = useRouter();
//   const { data, loading, error, refetch } = useQuery(GET_CUSTOMER_CART);

//   const cart = data?.customerCart?.itemsV2?.items || [];
//   console.log("data is ", data);
//   const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
//     onCompleted: () => {
//       refetch(); 
//     },
//     onError: (error) => {
//       console.error("Error removing item from cart:", error.message);
//     },
//   });

//   const [updateCartItem] = useMutation(UPDATE_CART_ITEMS, {
//     onCompleted: () => {
//       refetch(); 
//     },
//     onError: (error) => {
//       console.error("Error updating item in cart:", error.message);
//     },
//   });

//   const handleRemoveItem = (cartItemId: string) => {
//     removeFromCart({ variables: { cartId, cartItemId } });
//   };

//   const handleIncrementItem = (cartItemId: string, quantity: number) => {
//     updateCartItem({
//       variables: { cartId, cartItemId, quantity:quantity + 1 },
//     });
//   };

//   const handleDecrementItem = (cartItemId: string, quantity: number) => {
//     if (quantity > 1) {
//       updateCartItem({
//         variables: { cartId, cartItemId, quantity: quantity - 1 },
//       });
//     } else {
//       handleRemoveItem(cartItemId); 
//     }
//   };

//   const handleViewProductDetail = (url_key: string) => {
//     router.push(`/products/${url_key}`);
//     onClose();
//   };

//   const handleProceedToCheckout = () => {
//     router.push("/checkout");
//     onClose();
//   };

//   const totalQuantity = cart.reduce(
//     (total: number, item: CartItem) => total + item.quantity,
//     0
//   );

//   if (!isOpen) return null;
//   if (loading) return <p>Loading cart...</p>;
//   if (error) return <p>Error loading cart: {error.message}</p>;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             <h2 className="text-xl font-bold">Cart Items</h2>
//             {cart.length > 0 && (
//               <span className="ml-2 text-gray-600 text-sm">
//                 ({totalQuantity} items)
//               </span>
//             )}
//           </div>
//           <button className="text-gray-600 hover:text-black" onClick={onClose}>
//             <FontAwesomeIcon icon={faXmark} aria-label="Close" />
//           </button>
//         </div>
//         {cart.length > 0 ? (
//           <ul>
//             {cart.map((item: CartItem) => (
//               <li key={item.uid} className="mb-4 border-b pb-2">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <img
//                       src={item.product.image.url}
//                       alt={item.product.name}
//                       className="w-16 h-16 object-cover mr-4 cursor-pointer"
//                       onClick={() =>
//                         handleViewProductDetail(item.product.url_key)
//                       }
//                     />
//                     <div>
//                       <h3 className="font-semibold">{item.product.name}</h3>
//                       <p className="text-gray-600">
//                         $
//                         {item.product.price_range?.minimum_price?.final_price
//                           ?.value
//                           ? item.product.price_range.minimum_price.final_price.value.toFixed(
//                               2
//                             )
//                           : "N/A"}
//                       </p>
//                       <div className="flex items-center mt-2">
//                         <button
//                           className="border border-gray-300 px-2 text-gray-600 hover:text-black"
//                           onClick={() =>
//                             handleDecrementItem(item.uid, item.quantity)
//                           }
//                         >
//                           <FontAwesomeIcon
//                             icon={faMinus}
//                             aria-label="Remove item"
//                           />
//                         </button>
//                         <span className="px-3 font-medium border border-gray-300">
//                           {item.quantity}
//                         </span>
//                         <button
//                           className="border border-gray-300 px-2 text-gray-600 hover:text-black"
//                           onClick={() =>
//                             handleIncrementItem(item.uid, item.quantity)
//                           }
//                         >
//                           <FontAwesomeIcon
//                             icon={faPlus}
//                             aria-label="Add item"
//                           />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     className="text-gray-400 hover:text-black"
//                     onClick={() => handleRemoveItem(item.uid)}
//                   >
//                     <FontAwesomeIcon icon={faTrashCan} aria-label="Delete" />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Your cart is empty.</p>
//         )}
//         {cart.length > 0 && (
//           <button
//             className="capitalize mt-4 px-4 py-2 bg-black text-white border hover:bg-white hover:border-black hover:text-black font-bold"
//             onClick={handleProceedToCheckout}
//           >
//             Proceed to Checkout
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dialog;


// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMinus,
//   faPlus,
//   faTrashCan,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import { useRouter } from "next/navigation";
// import { useQuery, useMutation } from "@apollo/client";
// import { GET_CUSTOMER_CART } from "../graphql/getCustomerCart";
// import { REMOVE_FROM_CART } from "../graphql/removeFromCart";
// import { UPDATE_CART_ITEMS } from "../graphql/updateCartItems"; 

// interface CartItem {
//   uid: string;
//   quantity: number;
//   product: {
//     name: string;
//     sku: string;
//     url_key: string;
//     image: {
//       url: string;
//     };
//     price_range: {
//       minimum_price: {
//         final_price: {
//           value: number;
//           currency: string;
//         };
//       };
//     };
//   };
// }

// interface CartDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   cartId: string;
// }

// const Dialog: React.FC<CartDialogProps> = ({ isOpen, onClose, cartId }) => {
//   // console.log("Dialog cart id is ", cartId);
//   const router = useRouter();
//   const { data, loading, error, refetch } = useQuery(GET_CUSTOMER_CART);
//   // const { data, loading, error, refetch } = useQuery(GET_CUSTOMER_CART, {
//   //   skip: !cartId,
//   //   variables: { id: cartId },
//   // });
//   const cart = data?.customerCart?.itemsV2?.items || [];
//   console.log("data is ", data);
  
//   const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
//     onCompleted: () => {
//       refetch(); 
//     },
//     onError: (error) => {
//       console.error("Error removing item from cart:", error.message);
//     },
//   });

//   const [updateCartItem] = useMutation(UPDATE_CART_ITEMS, {
//     onCompleted: () => {
//       refetch(); 
//     },
//     onError: (error) => {
//       console.error("Error updating item in cart:", error.message);
//     },
//   });

//   const handleRemoveItem = (cartItemId: string) => {
//     removeFromCart({ variables: { cartId, cartItemId } });
//   };

//   const handleIncrementItem = (cartItemId: string, quantity: number) => {
//     console.log("Updating item with:", { cartId, cartItemUid: cartItemId, quantity });

//     updateCartItem({
//       variables: { cartId:cartId, cartItemUid: cartItemId, quantity: quantity + 1.0 },
//     });
//   };

//   const handleDecrementItem = (cartItemId: string, quantity: number) => {
//     if (quantity > 1) {
//       updateCartItem({
//         variables: { cartId:cartId, cartItemUid: cartItemId, quantity: quantity - 1.0 }, 
//       });
//     } else {
//       handleRemoveItem(cartItemId); 
//     }
//   };

//   const handleViewProductDetail = (url_key: string) => {
//     router.push(`/products/${url_key}`);
//     onClose();
//   };

//   const handleProceedToCheckout = () => {
//     router.push("/checkout");
//     onClose();
//   };

//   const totalQuantity = cart.reduce(
//     (total: number, item: CartItem) => total + item.quantity,
//     0
//   );

//   if (!isOpen) return null;
//   if (loading) return <p>Loading cart...</p>;
//   if (error) return <p>Error loading cart: {error.message}</p>;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             <h2 className="text-xl font-bold">Cart Items</h2>
//             {cart.length > 0 && (
//               <span className="ml-2 text-gray-600 text-sm">
//                 ({totalQuantity} items)
//               </span>
//             )}
//           </div>
//           <button className="text-gray-600 hover:text-black" onClick={onClose}>
//             <FontAwesomeIcon icon={faXmark} aria-label="Close" />
//           </button>
//         </div>
//         {cart.length > 0 ? (
//           <ul>
//             {cart.map((item: CartItem) => (
//               <li key={item.uid} className="mb-4 border-b pb-2">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <img
//                       src={item.product.image.url}
//                       alt={item.product.name}
//                       className="w-16 h-16 object-cover mr-4 cursor-pointer"
//                       onClick={() =>
//                         handleViewProductDetail(item.product.url_key)
//                       }
//                     />
//                     <div>
//                       <h3 className="font-semibold">{item.product.name}</h3>
//                       <p className="text-gray-600">
//                         $
//                         {item.product.price_range?.minimum_price?.final_price
//                           ?.value
//                           ? item.product.price_range.minimum_price.final_price.value.toFixed(
//                               2
//                             )
//                           : "N/A"}
//                       </p>
//                       <div className="flex items-center mt-2">
//                         <button
//                           className="border border-gray-300 px-2 text-gray-600 hover:text-black"
//                           onClick={() =>
//                             handleDecrementItem(item.uid, item.quantity)
//                           }
//                         >
//                           <FontAwesomeIcon
//                             icon={faMinus}
//                             aria-label="Remove item"
//                           />
//                         </button>
//                         <span className="px-3 font-medium border border-gray-300">
//                           {item.quantity}
//                         </span>
//                         <button
//                           className="border border-gray-300 px-2 text-gray-600 hover:text-black"
//                           onClick={() =>
//                             handleIncrementItem(item.uid, item.quantity)
//                           }
//                         >
//                           <FontAwesomeIcon
//                             icon={faPlus}
//                             aria-label="Add item"
//                           />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     className="text-gray-400 hover:text-black"
//                     onClick={() => handleRemoveItem(item.uid)}
//                   >
//                     <FontAwesomeIcon icon={faTrashCan} aria-label="Delete" />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Your cart is empty.</p>
//         )}
//         {cart.length > 0 && (
//           <button
//             className="capitalize mt-4 px-4 py-2 bg-black text-white border hover:bg-white hover:border-black hover:text-black font-bold"
//             onClick={handleProceedToCheckout}
//           >
//             Proceed to Checkout
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dialog;



import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@apollo/client";
import {
  faMinus,
  faPlus,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useCart } from '../hooks/useCart'; 
import { GET_CUSTOMER_CART } from "../graphql/getCustomerCart";

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

interface CartDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dialog: React.FC<CartDialogProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { cartId, handleRemoveFromCart, handleUpdateCartItem } = useCart();
  const { data, loading, error, refetch } = useQuery(GET_CUSTOMER_CART, {
    variables: { id: cartId },
    skip: !cartId,
  });

  const cart = data?.customerCart?.itemsV2?.items || [];

  const handleRemoveItem = (cartItemId: string) => {
    handleRemoveFromCart(cartItemId);
    refetch();
  };

  const handleIncrementItem = (cartItemId: string, quantity: number) => {
    handleUpdateCartItem(cartItemId, quantity + 1);
    refetch();
  };

  const handleDecrementItem = (cartItemId: string, quantity: number) => {
    if (quantity > 1) {
      handleUpdateCartItem(cartItemId, quantity - 1);
      refetch();
    } else {
      handleRemoveItem(cartItemId);
    }
  };

  const handleViewProductDetail = (url_key: string) => {
    router.push(`/products/${url_key}`);
    onClose();
  };

  const handleProceedToCheckout = () => {
    router.push("/checkout");
    onClose();
  };

  // const totalQuantity = cart.reduce(
  //   (total: number, item: CartItem) => total + item.quantity,
  //   0
  // );

  if (!isOpen) return null;
  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart: {error.message}</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Cart Items</h2>
          <button className="text-gray-600 hover:text-black" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} aria-label="Close" />
          </button>
        </div>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.uid} className="mb-4 border-b pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={item.product.image.url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover mr-4 cursor-pointer"
                      onClick={() => handleViewProductDetail(item.product.url_key)}
                    />
                    <div>
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-gray-600">
                        ${item.product.price_range.minimum_price.final_price.value.toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          className="border border-gray-300 px-2 text-gray-600 hover:text-black"
                          onClick={() => handleDecrementItem(item.uid, item.quantity)}
                        >
                          <FontAwesomeIcon icon={faMinus} aria-label="Remove item" />
                        </button>
                        <span className="px-3 font-medium border border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          className="border border-gray-300 px-2 text-gray-600 hover:text-black"
                          onClick={() => handleIncrementItem(item.uid, item.quantity)}
                        >
                          <FontAwesomeIcon icon={faPlus} aria-label="Add item" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleRemoveItem(item.uid)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} aria-label="Remove from cart" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
        <div className="mt-4">
          <button
            className="bg-black text-white py-2 px-4 rounded border hover:bg-white hover:text-black hover:border-black"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;

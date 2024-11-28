// import { useEffect, useState } from 'react';
// import { useMutation , useQuery } from '@apollo/client';
// import { CREATE_CART } from '../graphql/createCart';
// import { ADD_TO_CART } from '../graphql/addToCart';
// import { REMOVE_FROM_CART } from '../graphql/removeFromCart';
// import { MERGE_CARTS } from '../graphql/mergeCart';
// import { UPDATE_CART_ITEMS } from '../graphql/updateCartItems';
// // import { GET_CART_DETAILS } from '../graphql/getCartItems';
// // import { CLEAR_CART_ITEMS } from '../graphql/clearCart'; 

// export const useCart = () => {
//   const [cartId, setCartId] = useState<string | null>(null);
//   // const [cartData, setCartData] = useState(null);
//   const [createCart] = useMutation(CREATE_CART);
//   const [addToCartMutation] = useMutation(ADD_TO_CART);
//   const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);
//   const [mergeCarts] = useMutation(MERGE_CARTS);
//   const [updateCartItems] = useMutation(UPDATE_CART_ITEMS);
//   // const [clearCartMutation] = useMutation(CLEAR_CART_ITEMS); 

//   // const { data, refetch } = useQuery(GET_CART_DETAILS, {
//   //   variables: { cartId },
//   //   skip: !cartId,
//   //   onCompleted: (data) => {
//   //     setCartData(data.cart); 
//   //   },
//   // });

//   useEffect(() => {
//     const storedCartId = localStorage.getItem('cartId');
//     if (storedCartId) {
//       setCartId(storedCartId);
//     } else {
//       createCart()
//         .then(response => {
//           const newCartId = response.data.createEmptyCart;
//           localStorage.setItem('cartId', newCartId);
//           setCartId(newCartId);
//         })
//         .catch(error => {
//           console.error("Error creating cart:", error);
//         });
//     }
//   }, [createCart]);

//   const handleAddToCart = async (sku: string) => {
//     try {
//       const currentCartId = localStorage.getItem('cartId'); 
//       const response = await addToCartMutation({
//         variables: {
//           cartId: currentCartId, 
//           cartItems: [{ quantity: 1, sku, selected_options: [] }],
//         },
//       });
//       return response.data;
//     } catch (e) {
//       console.error("Error adding to cart:", e);
//       throw e;
//     }
//   };

//   const handleRemoveFromCart = async (cartItemUid: string) => {
//     // console.log("UID is here",cartItemUid);
//     try {
//       const currentCartId = localStorage.getItem('cartId'); 
//       const response = await removeFromCartMutation({
//         variables: {
//           cartId: currentCartId, 
//           cartItemUid: cartItemUid,
//         },
//       });
//     // await refetch();
//       return response.data;
//     } catch (e) {
//       console.error("Error removing from cart:", e);
//       throw e;
//     }
//   };

//   const handleMergeCarts = async (guestCartId: string, userCartId: string) => {
//     try {
//       const response = await mergeCarts({
//         variables: {
//           sourceCartId: guestCartId,      
//           destinationCartId: userCartId,  
//         },
//       });
//       localStorage.setItem('cartId', userCartId); 
//       setCartId(userCartId);
//       // console.log("Customer cart id is ", userCartId);
//       return response.data.mergeCarts;
//     } catch (e) {
//       console.error("Error merging carts:", e);
//       throw e;
//     }
//   };

 

//   // New function to clear the cart
//   // const handleClearCart = async () => {
//   //   try {
//   //     const currentCartId = localStorage.getItem('cartId'); 
//   //     const response = await clearCartMutation({
//   //       variables: {
//   //         uid: currentCartId, // Pass the current cart ID
//   //       },
//   //     });
//   //     // Optionally handle the response here if needed
//   //     return response.data.clearCart.cart; 
//   //   } catch (e) {
//   //     console.error("Error clearing cart:", e);
//   //     throw e;
//   //   }
//   // };

//   const handleUpdateCartItem = async (cartItemUid: string, quantity: number) => {
//     try {
//       console.log("Updating cart item with UID:", cartItemUid);
      
//       const currentCartId = localStorage.getItem('cartId');
      
//       if (!currentCartId) {
//         throw new Error("No cart ID found in local storage.");
//       }
      
//       if (typeof quantity !== 'number' || quantity <= 0) {
//         throw new Error(`Invalid quantity: ${quantity}. Quantity must be a positive number.`);
//       }
      
//       console.log("Quantity type:", typeof quantity, "Value:", quantity);
      
//       const response = await updateCartItems({
//         variables: {
//           cartId: currentCartId,
//           cartItemUid,
//           quantity,
//         },
//       });
      
   
//       if (!response || !response.data || !response.data.updateCartItems) {
//         throw new Error("Failed to update cart item. Invalid response.");
//       }
      
//       return response.data.updateCartItems.cart; 
//     } catch (e) {
//       console.error("Error updating cart item quantity:", e);
//       throw e; 
//     }
//   };
  

//   return { 
//     cartId, 
//     handleAddToCart, 
//     handleRemoveFromCart, 
//     handleMergeCarts, 
//     handleUpdateCartItem,
//     // handleClearCart 
//   };
// };



import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CART } from '../graphql/createCart';
import { ADD_TO_CART } from '../graphql/addToCart';
import { REMOVE_FROM_CART } from '../graphql/removeFromCart';
import { MERGE_CARTS } from '../graphql/mergeCart';
import { UPDATE_CART_ITEMS } from '../graphql/updateCartItems';
import { GET_CART_DETAILS } from '../graphql/getCartItems'; 

export const useCart = () => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [createCart] = useMutation(CREATE_CART);
  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);
  const [mergeCarts] = useMutation(MERGE_CARTS);
  const [updateCartItems] = useMutation(UPDATE_CART_ITEMS);

  
  const { refetch } = useQuery(GET_CART_DETAILS, {
    variables: { cartId },
    skip: !cartId,
  });

  useEffect(() => {
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      setCartId(storedCartId);
    } else {
      createCart()
        .then(response => {
          const newCartId = response.data.createEmptyCart;
          localStorage.setItem('cartId', newCartId);
          setCartId(newCartId);
        })
        .catch(error => {
          console.error("Error creating cart:", error);
        });
    }
  }, [createCart]);

  const handleAddToCart = async (sku: string) => {
    try {
      const currentCartId = localStorage.getItem('cartId');
      const response = await addToCartMutation({
        variables: {
          cartId: currentCartId,
          cartItems: [{ quantity: 1, sku, selected_options: [] }],
        },
      });
      await refetch(); // Refetch cart details after adding
      return response.data;
    } catch (e) {
      console.error("Error adding to cart:", e);
      throw e;
    }
  };

    const handleMergeCarts = async (guestCartId: string, userCartId: string) => {
    try {
      const response = await mergeCarts({
        variables: {
          sourceCartId: guestCartId,      
          destinationCartId: userCartId,  
        },
      });
      localStorage.setItem('cartId', userCartId); 
      setCartId(userCartId);
      return response.data.mergeCarts;
    } catch (e) {
      console.error("Error merging carts:", e);
      throw e;
    }
  };

  const handleRemoveFromCart = async (cartItemUid: string) => {
    try {
      const currentCartId = localStorage.getItem('cartId');
      await removeFromCartMutation({
        variables: {
          cartId: currentCartId,
          cartItemUid,
        },
      });
      await refetch();
    } catch (e) {
      console.error("Error removing from cart:", e);
      throw e;
    }
  };

  const handleUpdateCartItem = async (cartItemUid: string, quantity: number) => {
    try {
      const currentCartId = localStorage.getItem('cartId');
      const response = await updateCartItems({
        variables: {
          cartId: currentCartId,
          cartItemUid,
          quantity,
        },
      });
      await refetch(); 
      return response.data.updateCartItems.cart;
    } catch (e) {
      console.error("Error updating cart item quantity:", e);
      throw e;
    }
  };

  return {
    cartId,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateCartItem,
    handleMergeCarts,
  };
};

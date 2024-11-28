// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CartItem {
//   uid: string;
//   name: string;
//   url_key: string;
//   description: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// interface WishlistItem {
//   uid: string;
//   name: string;
//   url_key: string;
//   description: string;
//   price: number;
//   image: string;
// }

// interface AddToCartPayload {
//   uid: string;
//   name: string;
//   url_key: string;
//   description: string;
//   price: number;
//   image: string;
// }

// interface RemoveFromCartPayload {
//   uid: string;
// }

// interface AddToWishlistPayload {
//   uid: string;
//   name: string;
//   description: string;
//   price: number;
//   url_key: string;
//   image: string;
// }

// interface RemoveFromWishlistPayload {
//   uid: string;
// }

// // const initialState = {
// //   cart: [] as CartItem[],
// //   wishlist: [] as WishlistItem[],
// //   cartId :string | null
// // };
// interface CartState {
//   cart: CartItem[];
//   wishlist: WishlistItem[];
//   cartId: string | null; // Added cartId to the state
// }

// const initialState: CartState = {
//   cart: [],
//   wishlist: [],
//   cartId: null, 
// };
  
// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
//       // console.log(action.payload);
//       const itemExists = state.cart.find((item) => item.uid === action.payload.uid);
//       if (itemExists) {
//         itemExists.quantity++;
//       } else {
//         state.cart.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     removeItem: (state, action: PayloadAction<RemoveFromCartPayload>) => {
//       const index = state.cart.findIndex((item) => item.uid === action.payload.uid);
//       if (index !== -1) {
//         state.cart.splice(index, 1);
//       }
//     },
//     incrementQuantity: (state, action: PayloadAction<string>) => {
//       const item = state.cart.find((item) => item.uid === action.payload);
//       if (item) item.quantity++;
//     },
//     decrementQuantity: (state, action: PayloadAction<string>) => {
//       const item = state.cart.find((item) => item.uid === action.payload);
//       if (item) {
//         if (item.quantity === 1) {
//           const index = state.cart.findIndex((item) => item.uid === action.payload);
//           state.cart.splice(index, 1);
//         } else {
//           item.quantity--;
//         }
//       }
//     },
//     addToWishlist: (state, action: PayloadAction<AddToWishlistPayload>) => {
//       const itemExists = state.wishlist.find((item) => item.uid === action.payload.uid);
//       if (!itemExists) {
//         state.wishlist.push(action.payload);
//       }
//     },
//     removeFromWishlist: (state, action: PayloadAction<RemoveFromWishlistPayload>) => {
//       const index = state.wishlist.findIndex((item) => item.uid === action.payload.uid);
//       if (index !== -1) {
//         state.wishlist.splice(index, 1);
//       }
//     },
//   },
// });

// export const cartReducer = cartSlice.reducer;

// export const {
//   addToCart,
//   removeItem,
//   incrementQuantity,
//   decrementQuantity,
//   addToWishlist,
//   removeFromWishlist,
// } = cartSlice.actions;

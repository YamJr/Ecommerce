import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface AddToCartPayload {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface RemoveFromCartPayload {
  id: number;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<RemoveFromCartPayload>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) item.quantity++;
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          const index = state.findIndex((item) => item.id === action.payload);
          state.splice(index, 1);
        } else {
          item.quantity--;
        }
      }
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Define and export the AppDispatch type
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

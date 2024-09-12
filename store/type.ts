import store from './store'; // Ensure this is the correct path

export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/UserSlice'; 
import cartSlice from './slices/CartSlice'; 
import wishSlice from './slices/WishSlice'; 

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('Error saving state to local storage:', err);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Error loading state from local storage:', err);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
    reducer: {
        cart: cartSlice, // Access the reducer property of cartSlice
        users: userSlice, // Access the reducer property of userSlice
        wish: wishSlice,
    },

    preloadedState: persistedState,
});

store.subscribe(() => {
    const { cart, wish } = store.getState();
    saveToLocalStorage({ cart, wish });
  });

export default store;

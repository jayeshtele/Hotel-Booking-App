import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from '../features/booking/bookingSlice.js';
import searchReducer from '../features/search/searchSlice.js';
import wishlistReducer from '../features/wishlist/wishlistSlice.js';
import { stayApi } from '../services/stayApi.js';
import { saveToStorage } from './persistence.js';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    wishlist: wishlistReducer,
    bookings: bookingReducer,
    [stayApi.reducerPath]: stayApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stayApi.middleware),
});

let previousWishlist = store.getState().wishlist.ids;
let previousBookings = store.getState().bookings.items;

store.subscribe(() => {
  const state = store.getState();

  if (state.wishlist.ids !== previousWishlist) {
    previousWishlist = state.wishlist.ids;
    saveToStorage('staynest-wishlist', previousWishlist);
  }

  if (state.bookings.items !== previousBookings) {
    previousBookings = state.bookings.items;
    saveToStorage('staynest-bookings', previousBookings);
  }
});

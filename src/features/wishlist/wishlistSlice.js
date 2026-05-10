import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../app/persistence.js';

const initialState = {
  ids: loadFromStorage('staynest-wishlist', []),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const propertyId = action.payload;
      state.ids = state.ids.includes(propertyId)
        ? state.ids.filter((id) => id !== propertyId)
        : [...state.ids, propertyId];
    },
    clearWishlist: (state) => {
      state.ids = [];
    },
  },
});

export const { clearWishlist, toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

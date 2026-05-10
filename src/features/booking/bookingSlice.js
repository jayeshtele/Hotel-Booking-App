import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../app/persistence.js';

const initialState = {
  items: loadFromStorage('staynest-bookings', []),
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.items.unshift(action.payload);
    },
    removeBooking: (state, action) => {
      state.items = state.items.filter((booking) => booking.id !== action.payload);
    },
  },
});

export const { addBooking, removeBooking } = bookingSlice.actions;

export default bookingSlice.reducer;

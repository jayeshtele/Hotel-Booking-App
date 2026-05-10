import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  destination: '',
  checkIn: '',
  checkOut: '',
  guests: 2,
  category: 'All',
  maxPrice: 900,
  sortBy: 'recommended',
  instantBook: false,
  amenities: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setFilters: (state, action) => {
      Object.assign(state, action.payload);
    },
    toggleAmenity: (state, action) => {
      const amenity = action.payload;
      state.amenities = state.amenities.includes(amenity)
        ? state.amenities.filter((item) => item !== amenity)
        : [...state.amenities, amenity];
    },
    resetFilters: () => initialState,
  },
});

export const { resetFilters, setFilters, setSearchField, toggleAmenity } =
  searchSlice.actions;

export default searchSlice.reducer;

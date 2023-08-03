import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  filteredProducts: [],
  filterDefaultValues: {
    type: ['residential', 'commercial'],
    bedrooms: [1, 2, 3, 0],
    city: ['sharjah', 'dubai'],
    isAvailable: [true, false],
  },
  rdxFilter: {
    type: [],
    bedrooms: [],
    city: [],
    isAvailable: [],
  },
};

const slice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    rdxSetProducts(state, action) {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },

    // UPDATE FILTER
    rdxSetFilter(state, action) {
      const newFilter = action.payload;
      state.rdxFilter = { ...state.rdxFilter, ...newFilter };
    },

    rdxClearFilter(state) {
      state.rdxFilter = {
        type: [],
        bedrooms: [],
        city: [],
        isAvailable: [],
      };
    },

    // DELETE EVENT
    deleteEventSuccess(state, action) {
      const eventId = action.payload;
      state.events = state.events.filter((event) => event.id !== eventId);
    },
  },
});

// Reducer
export default slice.reducer;

export const { rdxSetFilter, rdxSetProducts, rdxClearFilter } = slice.actions;

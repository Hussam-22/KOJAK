import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  filteredProducts: [],
  filterDefaultValues: {
    type: ['residential', 'commercial'],
    spaceType: ['flat', 'showrooms', 'gym', 'labourcamp', 'shops', 'restaurant', 'offices'],
    city: ['sharjah', 'dubai'],
    isAvailable: [true, false],
  },
  rdxFilter: {
    type: [],
    spaceType: [],
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

    // STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
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
        spaceType: [],
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

export const { startLoading, stopLoading, rdxSetFilter, rdxSetProducts, rdxClearFilter } =
  slice.actions;

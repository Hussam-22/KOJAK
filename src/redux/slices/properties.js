import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  filteredProducts: [],
  filterDefaultValues: {
    isCommercial: [
      { label: 'Commercial', value: true },
      { label: 'Residential', value: false },
    ],
    spaceType: [
      { value: 'flat', label: 'Flat' },
      { value: 'showrooms', label: 'Showroom' },
      { value: 'health club / swimming pool', label: 'Health Club / Swimming Pool' },
      { value: 'laborCamp', label: 'Labor Camp' },
      { value: 'shops', label: 'Shop' },
      { value: 'restaurant', label: 'Restaurant' },
      { value: 'offices', label: 'Office' },
    ],
    city: [
      { value: 'Sharjah', label: 'Sharjah' },
      { value: 'Dubai', label: 'Dubai' },
    ],
    isActive: [
      { label: 'Available', value: true },
      { label: 'Not Available', value: false },
    ],
  },
  rdxFilter: {
    isCommercial: [],
    spaceType: [],
    city: [],
    isActive: [],
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

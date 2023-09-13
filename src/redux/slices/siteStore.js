import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  vehiclesList: [],
  vehiclesCoverUrls: [],
};

const slice = createSlice({
  name: 'siteStore',
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

    rdxAddVehiclesToStore(state, action) {
      state.vehiclesList = action.payload;
    },

    rdxAddVehiclesCoverUrlsToStore(state, action) {
      const index = state.vehiclesCoverUrls.findIndex((item) => item.id === action.payload.id);
      if (index === -1) state.vehiclesCoverUrls = [...state.vehiclesCoverUrls, action.payload];
    },
  },
});

// Reducer
export default slice.reducer;

export const { startLoading, stopLoading, rdxAddVehiclesToStore, rdxAddVehiclesCoverUrlsToStore } =
  slice.actions;

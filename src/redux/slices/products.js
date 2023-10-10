import { current, createSlice } from '@reduxjs/toolkit';

// utils

// ----------------------------------------------------------------------

const initialState = {
  products: [],
  filteredProducts: [],
  page: 1,
  filter: {
    partNo: '',
    partName: '',
    class: '',
    model: '',
    category: [],
  },
  cart: [],
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    rdxUpdatePage(state, action) {
      state.page = action.payload;
    },

    rdxLoadCartFromStorage(state, action) {
      state.cart = [...action.payload];
    },

    rdxUpdateCart(state, action) {
      if (!state.cart.includes(action.payload)) {
        state.cart = [...state.cart, action.payload];
      } else {
        state.cart = state.cart.filter((partNumber) => partNumber !== action.payload);
      }
    },

    rdxSetProducts(state, action) {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },

    rdxClearFilter(state) {
      const defaultFilter = { partNo: '', partName: '', class: '', model: '', category: [] };
      state.filter = { ...defaultFilter };
      state.filteredProducts = [];
    },

    rdxUpdateFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };

      let toFilteredProducts = state.products;

      // // FILTER BY PART NUMBER
      // if (state.filter.partNo !== '')
      //   toFilteredProducts = toFilteredProducts.filter(
      //     (product) =>
      //       product.partNumber.toString().toLowerCase() === state.filter.partNo.toLowerCase()
      //   );

      // // FILTER BY PART NAME
      // if (state.filter.partName !== '')
      //   toFilteredProducts = toFilteredProducts.filter(
      //     (product) =>
      //       product.partName.toString().toLowerCase() === state.filter.partName.toLowerCase()
      //   );

      // // FILTER BY CLASS
      // if (state.filter.class !== '')
      //   toFilteredProducts = toFilteredProducts.filter((product) =>
      //     product.brandClass.includes(state.filter.class)
      //   );

      // // FILTER BY MODEL
      // if (state.filter.model !== '')
      //   toFilteredProducts = toFilteredProducts.filter((product) =>
      //     product.brandModel.includes(state.filter.model)
      //   );

      // FILTER BY CATEGORY
      if (state.filter.category.length !== 0)
        toFilteredProducts = toFilteredProducts.filter((product) =>
          state.filter.category.includes(product.category)
        );

      if (
        state.filter.partNo === '' &&
        state.filter.partName === '' &&
        state.filter.class === '' &&
        state.filter.model === '' &&
        state.filter.category.length === 0
      ) {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = toFilteredProducts;
      }
    },
  },
});

// Reducer
export default slice.reducer;

export const {
  rdxSetProducts,
  rdxUpdatePage,
  rdxUpdateFilter,
  rdxClearFilter,
  rdxUpdateCart,
  rdxLoadCartFromStorage,
} = slice.actions;

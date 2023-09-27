import { createSlice } from '@reduxjs/toolkit';

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
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    rdxUpdatePage(state, action) {
      state.page = action.payload;
    },

    rdxSetProducts(state, action) {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },

    rdxUpdateFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };

      // let toFilteredProducts = state.products;

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

      // // FILTER BY CATEGORY
      // if (state.filter.category.length !== 0)
      //   toFilteredProducts = toFilteredProducts.filter((product) =>
      //     state.filter.category.includes(product.category)
      //   );

      // if (
      //   state.filter.partNo === '' &&
      //   state.filter.partName === '' &&
      //   state.filter.class === '' &&
      //   state.filter.model === '' &&
      //   state.filter.category.length === 0
      // ) {
      //   state.filteredProducts = state.products;
      // } else {
      //   state.filteredProducts = toFilteredProducts;
      // }
    },

    rdxClearFilter(state) {
      const defaultFilter = { partNo: '', partName: '', class: '', model: '', category: [] };
      state.filter = { ...defaultFilter };
      // state.filter = defaultFilter;
      state.filteredProducts = state.products;
    },
  },
});

// Reducer
export default slice.reducer;

export const { rdxSetProducts, rdxUpdatePage, rdxUpdateFilter, rdxClearFilter } = slice.actions;

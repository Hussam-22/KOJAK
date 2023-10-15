import { current, createSlice } from '@reduxjs/toolkit';

// utils

// ----------------------------------------------------------------------

const initialState = {
  products: [],
  filteredProducts: [],
  recordsCount: 0,
  startAfterDocument: undefined,
  startAtDocument: undefined,
  page: 1,
  filter: {
    partNo: '',
    partName: '',
    class: '',
    model: '',
    category: [],
  },
  cart: [],
  isDrawerOpen: false,
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    rdxUpdatePage(state, action) {
      state.page = action.payload;
    },

    rdxGetRecordsCount(state, action) {
      state.recordsCount = action.payload;
    },

    rdxUpdatePaginationDocuments(state, action) {
      state.startAfterDocument = action.payload.startAfterDocument;
      state.startAtDocument = action.payload.startAtDocument;
    },

    rdxToggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },

    rdxLoadCartFromStorage(state, action) {
      state.cart = [...action.payload];
    },

    rdxUpdateCart(state, action) {
      if (state.cart.some((cart) => cart.partNumber === action.payload.partNumber)) {
        state.cart = state.cart.filter((cart) => cart.partNumber !== action.payload.partNumber);
      } else {
        state.cart = [...state.cart, action.payload];
      }
    },

    rdxUpdatePartQty(state, action) {
      const index = state.cart.findIndex(
        (cartItem) => cartItem.partNumber === action.payload.partNumber
      );
      const newCart = state.cart;
      newCart[index].qty += action.payload.qty;
      state.cart = [...newCart];
    },

    rdxSetProducts(state, action) {
      state.startAfterDocument = action.payload[action.payload.length - 1].partNumber;
      state.startAtDocument = action.payload[0].partNumber;
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
  rdxUpdatePartQty,
  rdxToggleDrawer,
  rdxGetRecordsCount,
} = slice.actions;

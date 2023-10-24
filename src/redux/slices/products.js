import { current, createSlice } from '@reduxjs/toolkit';

// utils

// ----------------------------------------------------------------------

const initialState = {
  products: [],
  filteredProducts: [],
  recordsCount: 0,
  startAfterDocument: [undefined],
  currentPage: 1,
  filter: {
    partNo: '',
    class: '',
    model: '',
    category: [],
    inStockOnly: true,
  },
  cart: [],
  isDrawerOpen: false,
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    rdxToggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },

    // ----- Pagination ------------------------------------
    rdxUpdatePage(state, action) {
      state.currentPage = action.payload.page;
      if (action.payload.page > state.currentPage)
        state.startAfterDocument[action.payload.page - 1] = action.payload.startAfterDocument;
    },

    rdxGetRecordsCount(state, action) {
      state.recordsCount = action.payload;
    },
    // ----------------------------------------------------

    // ----- Cart -----------------------------------------
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
      if (action.payload?.isItemPage) {
        newCart[index].qty = action.payload.qty;
      } else newCart[index].qty += action.payload.qty;
      state.cart = [...newCart];
    },
    // ----------------------------------------------------

    // ----- Load Spare-Parts & Filter --------------------
    rdxSetProducts(state, action) {
      state.startAfterDocument[action.payload.page] =
        action.payload.sparePartsData[action.payload.sparePartsData.length - 1]?.partNumber ||
        undefined;

      state.products = action.payload.sparePartsData;

      if (state.filter.inStockOnly) {
        state.filteredProducts = action.payload.sparePartsData.filter((part) => part.stock > 0);
      } else state.filteredProducts = action.payload.sparePartsData;
    },

    rdxClearFilter(state) {
      const defaultFilter = { partNo: '', partName: '', class: '', model: '', category: [] };
      state.filter = { ...defaultFilter };
      state.products = [];
      state.filteredProducts = [];
      state.startAfterDocument = [undefined];
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

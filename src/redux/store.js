import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

import rootReducer from './rootReducer';

// ----------------------------------------------------------------------

// const store = configureStore({
//   reducer: persistReducer(rootPersistConfig, rootReducer),
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//       immutableCheck: false,
//     }),
// });

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [
          'products.products',
          'products.payload.sparePartsData',
          'payload.sparePartsData',
        ],
        ignoredPaths: [
          'products.products',
          'products.payload.sparePartsData',
          'payload.sparePartsData',
          'products.filteredProducts',
          'products.filteredProducts.0.creationDate',
        ],
      },
    }),
});

// const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, dispatch, useSelector, useDispatch };

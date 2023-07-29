import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// slices
// import products from './slices/products';
import propertiesReducer from './slices/properties';

// ----------------------------------------------------------------------

// export const rootPersistConfig = {
//   key: 'root',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: [],
// };

// export const productPersistConfig = {
//   key: 'product',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['sortBy', 'checkout'],
// };

const rootReducer = combineReducers({
  properties: propertiesReducer,

  //   product: persistReducer(productPersistConfig, productReducer),
});

export default rootReducer;

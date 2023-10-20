import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import thunk from 'redux-thunk';
import alertReducer from './alert/reducer';
import categoriesReducer from './categories/reducer';
import cartReducer from './cart/reducer';
import { addressReducer, selectedAddressReducer } from './userAddress/reducer';
import authUserReducer from './authUser/reducer';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    alert: alertReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    address: addressReducer,
    selectedAddress: selectedAddressReducer,
    authUser: authUserReducer,
  },
  middleware: [thunk],
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import thunk from 'redux-thunk';
import alertReducer from './alert/reducer';
import cartReducer from './cart/reducer';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    alert: alertReducer,
    cart: cartReducer,
  },
  middleware: [thunk],
});

export default store;

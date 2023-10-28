import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import thunk from 'redux-thunk';
import alertReducer from './alert/reducer';
import categoriesReducer from './categories/reducer';
import cartReducer from './cart/reducer';
import productsReducer from './products/reducer';
import productPaginationReducer from './productPagination/reducer';
import carouselsReducer from './carousels/reducer';
import { addressReducer, selectedAddressReducer } from './userAddress/reducer';
import authUserReducer from './authUser/reducer';
import productReducer from './product/reducer';
import warehousesReducer from './warehouses/reducer';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    alert: alertReducer,
    carousels: carouselsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    product: productReducer,
    products: productsReducer,
    productPagination: productPaginationReducer,
    address: addressReducer,
    selectedAddress: selectedAddressReducer,
    authUser: authUserReducer,
    warehouses: warehousesReducer,
  },
  middleware: [thunk],
});

export default store;

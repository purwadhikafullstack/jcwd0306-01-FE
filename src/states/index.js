import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import alertReducer from './alert/reducer';
import categoriesReducer from './categories/reducer';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    alert: alertReducer,
    categories: categoriesReducer,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import alertReducer from './alert/reducer';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    alert: alertReducer,
  },
});

export default store;

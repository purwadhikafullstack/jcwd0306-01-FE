import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAlertActionCreator } from '../alert/action';
import api from '../../constants/api';

const ActionType = {
  GET_PRODUCT: 'GET_PRODUCT',
};

function getProductActionCreator(product) {
  return {
    type: ActionType.GET_PRODUCT,
    payload: { product },
  };
}

function asyncGetProduct(id) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.get(`/products/${id}`);
      dispatch(getProductActionCreator(data.data));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, getProductActionCreator, asyncGetProduct };

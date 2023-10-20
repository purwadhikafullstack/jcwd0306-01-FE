import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../constants/api';
import { setAlertActionCreator } from '../alert/action';

const ActionType = {
  GET_CAROUSELS: 'GET_CAROUSELS',
};

function getCarouselsActionCreator(carousels) {
  return {
    type: ActionType.GET_CAROUSELS,
    payload: { carousels },
  };
}

function asyncGetCarousels() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.get('/carousels');
      dispatch(getCarouselsActionCreator(data.data));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, getCarouselsActionCreator, asyncGetCarousels };

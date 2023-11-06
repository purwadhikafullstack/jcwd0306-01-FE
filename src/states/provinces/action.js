import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAlertActionCreator } from '../alert/action';
import api from '../../constants/api';

const ActionType = {
  GET_PROVINCES: 'GET_PROVINCES',
};

function getProvincesActionCreator(provinces) {
  return {
    type: ActionType.GET_PROVINCES,
    payload: { provinces },
  };
}

function asyncGetProvinces() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.get('/province');
      dispatch(getProvincesActionCreator(data));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, getProvincesActionCreator, asyncGetProvinces };

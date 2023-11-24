import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../constants/api';
import { setAlertActionCreator } from '../alert/action';

const ActionType = {
  GET_CITIES: 'GET_CITIES',
};

function getCitiesActionCreator(cities) {
  return {
    type: ActionType.GET_CITIES,
    payload: { cities },
  };
}

function asyncGetCities({ provinceId }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.get(
        `/city?provinceId=${encodeURIComponent(provinceId)}`
      );
      dispatch(getCitiesActionCreator(data.rows));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, getCitiesActionCreator, asyncGetCities };

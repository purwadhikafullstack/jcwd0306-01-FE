import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAlertActionCreator } from '../alert/action';
import api from '../../constants/api';

const ActionType = {
  GET_WAREHOUSE: 'GET_WAREHOUSE',
};

function getWarehouseActionCreator(warehouse) {
  return {
    type: ActionType.GET_WAREHOUSE,
    payload: { warehouse },
  };
}

function asyncGetWarehouse(warehouseId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.get(`/warehouses/${warehouseId}`);
      dispatch(getWarehouseActionCreator(data.data));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, getWarehouseActionCreator, asyncGetWarehouse };

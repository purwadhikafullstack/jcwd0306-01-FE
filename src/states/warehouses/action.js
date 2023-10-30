import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAlertActionCreator } from '../alert/action';
import api from '../../constants/api';

const ActionType = {
  GET_WAREHOUSES: 'GET_WAREHOUSES',
  CREATE_WAREHOUSE: 'CREATE_WAREHOUSE',
  EDIT_WAREHOUSE: 'EDIT_WAREHOUSE',
  ACTIVATE_WAREHOUSE: 'ACTIVATE_WAREHOUSE',
  DEACTIVATE_WAREHOUSE: 'DEACTIVATE_WAREHOUSE',
};

function getWarehousesActionCreator(warehouses) {
  return {
    type: ActionType.GET_WAREHOUSES,
    payload: { warehouses },
  };
}

function createWarehouseActionCreator(warehouse) {
  return {
    type: ActionType.CREATE_WAREHOUSE,
    payload: { warehouse },
  };
}

function editWarehouseActionCreator(warehouse) {
  return {
    type: ActionType.EDIT_WAREHOUSE,
    payload: { warehouse },
  };
}

function activateWarehouseActionCreator(warehouse) {
  return {
    type: ActionType.ACTIVATE_WAREHOUSE,
    payload: { warehouse },
  };
}

function deactivateWarehouseActionCreator(warehouse) {
  return {
    type: ActionType.DEACTIVATE_WAREHOUSE,
    payload: { warehouse },
  };
}

function asyncGetWarehouses() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.get('/warehouses');
      dispatch(getWarehousesActionCreator(data.data));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateWarehouse(values) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.post('/warehouses', values);
      dispatch(createWarehouseActionCreator(data.data));
      dispatch(setAlertActionCreator());
      return true;
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncEditWarehouse(warehouseId, values) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.patch(`/warehouses/${warehouseId}`, values);
      dispatch(editWarehouseActionCreator(data.data));
      dispatch(setAlertActionCreator());
      return true;
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncActivateWarehouse(warehouseId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.put(
        `/warehouses/${warehouseId}?action=activate`
      );
      dispatch(activateWarehouseActionCreator(data.data));
      dispatch(setAlertActionCreator());
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeactivateWarehouse(warehouseId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.put(
        `/warehouses/${warehouseId}?action=deactivate`
      );
      dispatch(deactivateWarehouseActionCreator(data.data));
      dispatch(setAlertActionCreator());
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  getWarehousesActionCreator,
  createWarehouseActionCreator,
  editWarehouseActionCreator,
  activateWarehouseActionCreator,
  deactivateWarehouseActionCreator,
  asyncGetWarehouses,
  asyncCreateWarehouse,
  asyncEditWarehouse,
  asyncActivateWarehouse,
  asyncDeactivateWarehouse,
};

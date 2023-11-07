import api from '../../constants/api';

const ActionType = {
  GET_WAREHOUSE_ADMIN: 'GET_WAREHOUSE_ADMIN',
};

function getWarehouseAdminActionCreator(warehouseAdmin) {
  return {
    type: ActionType.GET_WAREHOUSE_ADMIN,
    payload: { warehouseAdmin },
  };
}

function asyncGetWarehouseAdmin(warehouseId) {
  return async (dispatch) => {
    try {
      const data = await api.get(`/warehouseusers/${warehouseId}/users`);
      console.log(data.data);

      dispatch(getWarehouseAdminActionCreator(data.data));
    } catch (err) {
      console.log(err);
    }
  };
}

export { ActionType, asyncGetWarehouseAdmin, getWarehouseAdminActionCreator };

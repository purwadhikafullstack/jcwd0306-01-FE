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

// function deleteWarehouseAdminActionCreator()

function asyncGetWarehouseAdmin() {
  return async (dispatch) => {
    try {
      const data = await api.get(`/warehouseusers`);
      // console.log(data.data.data);

      dispatch(getWarehouseAdminActionCreator(data.data.data));
    } catch (err) {
      console.log(err);
    }
  };
}

export { ActionType, asyncGetWarehouseAdmin, getWarehouseAdminActionCreator };

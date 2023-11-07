import { ActionType } from './action';

function administratorReducer(warehouseAdmin = null, action = {}) {
  switch (action.type) {
    case ActionType.GET_WAREHOUSE_ADMIN:
      return action.payload.warehouseAdmin;

    default:
      return warehouseAdmin;
  }
}

export default administratorReducer;

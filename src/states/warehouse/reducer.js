import { ActionType } from './action';

function warehouseReducer(warehouse = null, action = {}) {
  switch (action.type) {
    case ActionType.GET_WAREHOUSE:
      return action.payload.warehouse;

    default:
      return warehouse;
  }
}

export default warehouseReducer;

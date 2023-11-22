import { ActionType } from './action';

function warehouseAdminPaginationReducer(
  warehouseAdminPagination = {},
  action = {}
) {
  switch (action.type) {
    case ActionType.SET_WAREHOUSE_ADMIN_PAGINATION:
      return action.payload.info;

    default:
      return warehouseAdminPagination;
  }
}

export default warehouseAdminPaginationReducer;

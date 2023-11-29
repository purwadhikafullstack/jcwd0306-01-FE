import { ActionType } from './action';

function warehousePaginationReducer(warehousePagination = {}, action = {}) {
  switch (action.type) {
    case ActionType.SET_WAREHOUSE_PAGINATION:
      return action.payload.info;

    default:
      return warehousePagination;
  }
}

export default warehousePaginationReducer;

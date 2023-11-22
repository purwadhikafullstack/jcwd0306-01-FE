import { ActionType } from './action';

function productHistoryPaginationReducer(
  productHistoryPagination = {},
  action = {}
) {
  switch (action.type) {
    case ActionType.SET_PRODUCT_HISTORY_PAGINATION:
      return action.payload.info;

    default:
      return productHistoryPagination;
  }
}

export default productHistoryPaginationReducer;

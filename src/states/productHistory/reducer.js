import { ActionType } from './action';

function productHistoryReducer(productHistory = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_PRODUCT_HISTORY:
      return action.payload.productHistory;

    default:
      return productHistory;
  }
}

export default productHistoryReducer;

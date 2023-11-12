import { ActionType } from './action';

function productReducer(product = null, action = {}) {
  switch (action.type) {
    case ActionType.GET_PRODUCT:
      return action.payload.product;

    case ActionType.UPDATE_WAREHOUSEPRODUCT_STOCK:
      return action.payload.product;

    default:
      return product;
  }
}

export default productReducer;

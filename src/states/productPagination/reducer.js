import { ActionType } from './action';

function productPaginationReducer(productPagination = {}, action = {}) {
  switch (action.type) {
    case ActionType.SET_PRODUCT_PAGINATION:
      return action.payload.info;

    default:
      return productPagination;
  }
}

export default productPaginationReducer;

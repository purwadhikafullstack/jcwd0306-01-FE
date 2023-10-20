import { ActionType } from './action';

function productsReducer(products = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_AND_REPLACE_PRODUCTS:
      return action.payload.products;
    //   return [
    //     ...action.payload.products,
    //     ...action.payload.products,
    //     ...action.payload.products,
    //     ...action.payload.products,
    //     ...action.payload.products,
    //     ...action.payload.products,
    //     ...action.payload.products,
    //     ...action.payload.products,
    //     ...action.payload.products,
    //   ];

    case ActionType.GET_AND_PUSH_PRODUCTS:
      return [...products, ...action.payload.products];

    default:
      return products;
  }
}

export default productsReducer;

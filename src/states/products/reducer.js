import { ActionType } from './action';

function productsReducer(products = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_AND_REPLACE_PRODUCTS:
      return action.payload.products;

    case ActionType.GET_AND_PUSH_PRODUCTS:
      return [...products, ...action.payload.products];

    case ActionType.EDIT_PRODUCT:
      return products.map((product) => {
        if (product.id === action.payload.product.id)
          return { ...product, ...action.payload.product };
        return product;
      });

    case ActionType.ACTIVATE_PRODUCT:
      return products.map((product) => {
        if (product.id === action.payload.product.id)
          return { ...product, ...action.payload.product };
        return product;
      });

    case ActionType.DEACTIVATE_PRODUCT:
      return products.map((product) => {
        if (product.id === action.payload.product.id)
          return { ...product, ...action.payload.product };
        return product;
      });

    default:
      return products;
  }
}

export default productsReducer;

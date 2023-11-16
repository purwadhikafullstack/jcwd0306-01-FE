import { constant } from '../../constants/constant';

const initState = [];

function cartReducer(state = initState, action = {}) {
  if (action.type === constant.createCart)
    return [
      action.payload,
      ...state.filter((cart) => cart.productId !== action.payload.productId),
    ];
  if (
    action.type === constant.updateProductOnCart ||
    action.type === constant.deleteProductFromCart
  )
    return [...action.payload];
  if (action.type === constant.resetCart || action.type === constant.logout)
    return initState;

  return state;
}

export default cartReducer;

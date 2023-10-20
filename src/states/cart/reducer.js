import { constant } from '../../constants/constant';

const initState = [];

function cartReducer(state = initState, action = {}) {
  if (action.type === constant.addProductToCart)
    return [...state, action.payload];
  if (
    action.type === constant.updateProductOnCart ||
    action.type === constant.deleteProductFromCart
  )
    return [...action.payload];
  if (action.type === constant.resetCart) return initState;
  if (action.type === constant.logout) return initState;

  return state;
}

export default cartReducer;

import { constant } from '../../constants/constant';

const initState = { verifying: 0, processed: 0, shipped: 0, received: 0 };

function orderStatusReducer(state = initState, action = {}) {
  if (action.type === constant.updateOrderStatus)
    return {
      ...state,
      ...(action.payload.verifying && { verifying: action.payload.verifying }),
      ...(action.payload.processed && { processed: action.payload.processed }),
      ...(action.payload.shipped && { shipped: action.payload.shipped }),
      ...(action.payload.received && { received: action.payload.received }),
    };
  if (action.type === constant.logout) return initState;

  return state;
}

export default orderStatusReducer;

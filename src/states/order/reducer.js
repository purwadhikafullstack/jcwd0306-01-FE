import { constant } from '../../constants/constant';

const initState = [];

function orderReducer(state = initState, action = {}) {
  if (action.type === constant.updateUnpaid) return action.payload;
  if (action.type === constant.addUnpaid) return [...state, action.payload];
  if (action.type === constant.logout) return initState;

  return state;
}

export default orderReducer;

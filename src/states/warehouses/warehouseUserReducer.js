import { constant } from '../../constants/constant';

const initState = [];

export const warehouseUserReducer = (state = initState, action = {}) => {
  if (action.type === constant.setWarehouseUser) return action.payload || state;
  if (action.type === constant.logout) return initState;

  return state;
};

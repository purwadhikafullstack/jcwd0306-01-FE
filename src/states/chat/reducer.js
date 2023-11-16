import { constant } from '../../constants/constant';

const initState = new Map([
  [`receiverId`, 0],
  [`orderId`, 0],
  [`warehouseId`, 0],
]);

export const chatReducer = (state = initState, action = {}) => {
  if (action.type === constant.setChatRoom) return action.payload;
  if (action.type === constant.resetChatRoom || action.type === constant.logout)
    return initState;

  return state;
};

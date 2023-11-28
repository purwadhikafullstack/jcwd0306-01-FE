import { ActionType } from './action';

function userAddressReducer(addresses = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_ADDRESS:
      return action.payload.addresses;

    default:
      return addresses;
  }
}

export default userAddressReducer;

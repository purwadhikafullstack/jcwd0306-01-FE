import { ActionType } from './action';

function addressPaginationReducer(AddressPagination = {}, action = {}) {
  switch (action.type) {
    case ActionType.SET_ADDRESS_PAGINATION:
      return action.payload.info;

    default:
      return AddressPagination;
  }
}

export default addressPaginationReducer;

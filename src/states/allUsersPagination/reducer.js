import { ActionType } from './action';

function allUsersPaginationReducer(allUsersPagination = {}, action = {}) {
  switch (action.type) {
    case ActionType.SET_ALL_USERS_PAGINATION:
      return action.payload.info;

    default:
      return allUsersPagination;
  }
}

export default allUsersPaginationReducer;

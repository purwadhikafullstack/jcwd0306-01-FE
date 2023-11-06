import { ActionType } from './action';

function authUserReducer(authUser = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload.authUser;

    case ActionType.UNSET_AUTH_USER:
      return null;

    case ActionType.UPDATE_AUTH_USER:
      return { ...authUser, ...action.payload };

    default:
      return authUser;
  }
}

export default authUserReducer;

import { ActionType } from './action';

function authUserReducer(authUser = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload.authUser;

    case ActionType.UNSET_AUTH_USER:
      return null;

    case ActionType.UPDATE_AUTH_USER:
      return { ...authUser, ...action.payload };

    case ActionType.UPDATE_USER_IMAGE:
      return { ...authUser, imageUrl: action.payload };

    case ActionType.DELETE_USER_IMAGE:
      return { ...authUser, imageUrl: null };

    default:
      return authUser;
  }
}

export default authUserReducer;

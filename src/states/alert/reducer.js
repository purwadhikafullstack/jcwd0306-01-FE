import { ActionType } from './action';

const alertReducer = (alert = {}, action = {}) => {
  switch (action.type) {
    case ActionType.SET_ALERT:
      return {
        ...alert,
        ...action.payload,
      };

    case ActionType.UNSET_ALERT:
      return {
        ...alert,
        ...action.payload,
      };

    default:
      return alert;
  }
};

export default alertReducer;

import { ActionType } from './action';

function provincesReducer(provinces = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_PROVINCES:
      return action.payload.provinces;

    default:
      return provinces;
  }
}

export default provincesReducer;

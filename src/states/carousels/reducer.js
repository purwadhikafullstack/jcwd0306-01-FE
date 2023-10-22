import { ActionType } from './action';

function carouselsReducer(carousels = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_CAROUSELS:
      return action.payload.carousels;

    default:
      return carousels;
  }
}

export default carouselsReducer;

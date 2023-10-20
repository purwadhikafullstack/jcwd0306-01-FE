import { constant } from '../../constants/constant';

const initState = {
  id: 0,
  isVerified: false,
  firstName: '',
  email: '',
  isCustomer: true,
  isAdmin: false,
  isWarehouseAdmin: false,
};

function authUserReducer(state = initState, action = {}) {
  if (action.type === constant.login) {
    return {
      ...state,
      id: action.payload.id,
      isVerified: action.payload.isVerified,
      firstName: action.payload.firstName,
      email: action.payload.email,
      isCustomer: action.payload.isCustomer,
      isAdmin: action.payload.isAdmin,
      isWarehouseAdmin: action.payload.isWarehouseAdmin,
    };
  }
  if (action.type === constant.logout) return initState;

  return state;
}

export default authUserReducer;

import { constant } from '../../constants/constant';

const initState = [];

const addressReducer = (state = initState, action = {}) => {
  if (action.type === constant.addAddress) {
    return [...state, action.payload];
  }
  if (
    action.type === constant.deleteAddress ||
    action.type === constant.updateAddress
  ) {
    return [action.payload];
  }
  if (action.type === constant.logout) return initState;

  return state;
};

const initialState = {
  City: {},
  Province: {},
  addressName: '',
  cityId: 0,
  country: '',
  createdAt: '',
  detail: '',
  district: '',
  id: 0,
  isDefault: false,
  latitude: 110,
  longitude: -8,
  postalCode: 0,
  provinceId: 0,
  receiverName: '',
  receiverPhone: '',
  updatedAt: '',
  userId: 0,
  village: '',
};
const selectedAddressReducer = (state = initialState, action = {}) => {
  if (action.type === constant.selectAddress) return action.payload;
  if (action.type === constant.logout) return initState;
  return state;
};

export { selectedAddressReducer, addressReducer };

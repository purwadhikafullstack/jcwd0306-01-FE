import api from '../../constants/api';
import { setAlertActionCreator } from '../alert/action';

const ActionType = {
  GET_ADDRESS: 'GET_ADDRESS',
  CREATE_ADDRESS: 'CREATE_ADDRESS',
  EDIT_ADDRESS: 'EDIT_ADDRESS',
  DELETE_ADDRESS: 'DELETE_ADDRESS',
};

function getAddressActionCreator(addresses) {
  return {
    type: ActionType.GET_ADDRESS,
    payload: { addresses },
  };
}

function asyncGetAddress(userId) {
  return async (dispatch) => {
    try {
      const { data } = await api.get(`/user_address/${userId}`);
      dispatch(getAddressActionCreator(data.rows));
    } catch (error) {
      // karena error nya di homepage sebelum login, jadi gausah dikasih alert
      console.log(error);
    }
  };
}

export { ActionType, getAddressActionCreator, asyncGetAddress };

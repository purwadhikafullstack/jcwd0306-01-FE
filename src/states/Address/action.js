import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../constants/api';
import { setAddressPaginationActionCreator } from '../AddressPagination/action';
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

function asyncGetAddress({ userId, name, page, perPage }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const nameQ = name ? `name=${encodeURIComponent(name)}&` : '';
      const pageQ = page ? `page=${encodeURIComponent(page)}&` : '';
      const perPageQ = perPage ? `perPage=${encodeURIComponent(perPage)}&` : '';
      const allQuery = `?${nameQ}${pageQ}${perPageQ}`;

      const { data } = await api.get(
        `/user_address/${userId}/customerAddress${allQuery}`
      );
      dispatch(getAddressActionCreator(data.data));
      dispatch(setAddressPaginationActionCreator(data.info));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, getAddressActionCreator, asyncGetAddress };

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../constants/api';
import { setAllUsersPaginationActionCreator } from '../allUsersPagination/action';
import { setAlertActionCreator } from '../alert/action';

const ActionType = {
  GET_USERS: 'GET_USERS',
};

function getUsersActionCreator(users) {
  return {
    type: ActionType.GET_USERS,
    payload: { users },
  };
}

function asyncGetUsers({ name, sortBy, orderBy, page, perPage } = {}) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const nameQ = name ? `name=${encodeURIComponent(name)}&` : '';
      const sortByQ = sortBy ? `sortBy=${encodeURIComponent(sortBy)}&` : '';
      const orderByQ = orderBy ? `orderBy=${encodeURIComponent(orderBy)}&` : '';
      const pageQ = page ? `page=${encodeURIComponent(page)}&` : '';
      const perPageQ = perPage ? `perPage=${encodeURIComponent(perPage)}&` : '';
      const allQuery = `?${nameQ}${sortByQ}${orderByQ}${pageQ}${perPageQ}`;

      const data = await api.get(`/user/getAll${allQuery}`);

      dispatch(getUsersActionCreator(data.data.data));
      dispatch(setAllUsersPaginationActionCreator(data.data.info));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, asyncGetUsers, getUsersActionCreator };

import api from '../../constants/api';
import { setWarehouseAdminPaginationActionCreator } from '../AdministratorPagination/action';

const ActionType = {
  GET_WAREHOUSE_ADMIN: 'GET_WAREHOUSE_ADMIN',
};

function getWarehouseAdminActionCreator(warehouseAdmin) {
  return {
    type: ActionType.GET_WAREHOUSE_ADMIN,
    payload: { warehouseAdmin },
  };
}

// function deleteWarehouseAdminActionCreator()

function asyncGetWarehouseAdmin({ name, sortBy, orderBy, page, perPage } = {}) {
  return async (dispatch) => {
    try {
      const nameQ = name ? `name=${encodeURIComponent(name)}&` : '';
      const sortByQ = sortBy ? `sortBy=${encodeURIComponent(sortBy)}&` : '';
      const orderByQ = orderBy ? `orderBy=${encodeURIComponent(orderBy)}&` : '';
      const pageQ = page ? `page=${encodeURIComponent(page)}&` : '';
      const perPageQ = perPage ? `perPage=${encodeURIComponent(perPage)}&` : '';
      const allQuery = `?${nameQ}${sortByQ}${orderByQ}${pageQ}${perPageQ}`;

      const data = await api.get(`/warehouseusers${allQuery}`);
      // console.log(data);

      dispatch(getWarehouseAdminActionCreator(data.data.data));
      dispatch(setWarehouseAdminPaginationActionCreator(data.data.info));
    } catch (err) {
      console.log(err);
    }
  };
}

export { ActionType, asyncGetWarehouseAdmin, getWarehouseAdminActionCreator };

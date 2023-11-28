import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../constants/api';
import { setAlertActionCreator } from '../alert/action';
import { setStockMutationPaginationActionCreator } from '../stockMutationPagination/action';

const ActionType = {
  GET_STOCKMUTATIONS: 'GET_STOCKMUTATIONS',
  UPDATE_STOCKMUTATION_STATUS: 'UPDATE_STOCKMUTATION_STATUS',
  DELETE_STOCKMUTATION: 'DELETE_STOCKMUTATION',
};

function getStockMutationsActionCreator(stockMutations) {
  return {
    type: ActionType.GET_STOCKMUTATIONS,
    payload: { stockMutations },
  };
}

function updateStockMutationStatusActionCreator(stockMutation) {
  return {
    type: ActionType.UPDATE_STOCKMUTATION_STATUS,
    payload: { stockMutation },
  };
}

function deleteStockMutationActionCreator(stockMutationId) {
  return {
    type: ActionType.DELETE_STOCKMUTATION,
    payload: { stockMutationId },
  };
}

function asyncCreateStockMutation(values) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      await api.post('/stockmutations', values);
      dispatch(setAlertActionCreator());
      return true;
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetStockMutations({
  search,
  warehouseId,
  status,
  type,
  sortBy,
  orderBy,
  page,
  perPage,
}) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());

      const newSortBy = [
        'id',
        'status',
        'quantity',
        'type',
        'orderId',
        'createdAt',
        'updatedAt',
        'product-name',
        'from-wh-name',
        'to-wh-name',
      ].includes(sortBy)
        ? sortBy
        : 'updatedAt';

      const searchQ = search ? `search=${encodeURIComponent(search)}&` : '';
      const warehouseIdQ = warehouseId
        ? `warehouseId=${encodeURIComponent(warehouseId)}&`
        : '';
      const statusQ = status ? `status=${encodeURIComponent(status)}&` : '';
      const typeQ = type ? `type=${encodeURIComponent(type)}&` : '';
      const sortByQ = `sortBy=${encodeURIComponent(newSortBy)}&`;
      const orderByQ = orderBy ? `orderBy=${encodeURIComponent(orderBy)}&` : '';
      const pageQ = page ? `page=${encodeURIComponent(page)}&` : '';
      const perPageQ = perPage ? `perPage=${encodeURIComponent(perPage)}&` : '';
      const allQuery = `?${searchQ}${warehouseIdQ}${statusQ}${typeQ}${sortByQ}${orderByQ}${pageQ}${perPageQ}`;

      const { data } = await api.get(`/stockmutations${allQuery}`);
      dispatch(getStockMutationsActionCreator(data.data));
      dispatch(setStockMutationPaginationActionCreator(data.info));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateStockMutationStatus(stockMutationId, values) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.patch(
        `/stockmutations/${stockMutationId}`,
        values
      );
      dispatch(updateStockMutationStatusActionCreator(data.data));
      dispatch(setAlertActionCreator());
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteStockMutation(stockMutationId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      await api.delete(`/stockmutations/${stockMutationId}`);
      dispatch(deleteStockMutationActionCreator(stockMutationId));
      dispatch(setAlertActionCreator());
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  getStockMutationsActionCreator,
  updateStockMutationStatusActionCreator,
  deleteStockMutationActionCreator,
  asyncCreateStockMutation,
  asyncGetStockMutations,
  asyncUpdateStockMutationStatus,
  asyncDeleteStockMutation,
};

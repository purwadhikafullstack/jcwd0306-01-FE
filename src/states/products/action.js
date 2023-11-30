import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAlertActionCreator } from '../alert/action';
import { setProductPaginationActionCreator } from '../productPagination/action';
import api from '../../constants/api';

const ActionType = {
  GET_AND_REPLACE_PRODUCTS: 'GET_PRODUCTS',
  GET_AND_PUSH_PRODUCTS: 'GET_AND_PUSH_PRODUCTS',
  EDIT_PRODUCT: 'EDIT_PRODUCT',
  ACTIVATE_PRODUCT: 'ACTIVATE_PRODUCT',
  DEACTIVATE_PRODUCT: 'DEACTIVATE_PRODUCT',
};

function getAndReplaceProductsActionCreator(products) {
  return {
    type: ActionType.GET_AND_REPLACE_PRODUCTS,
    payload: { products },
  };
}

function getAndPushProductsActionCreator(products) {
  return {
    type: ActionType.GET_AND_PUSH_PRODUCTS,
    payload: { products },
  };
}

function editProductActionCreator(product) {
  return {
    type: ActionType.EDIT_PRODUCT,
    payload: { product },
  };
}

function activateProductActionCreator(product) {
  return {
    type: ActionType.ACTIVATE_PRODUCT,
    payload: { product },
  };
}

function deactivateProductActionCreator(product) {
  return {
    type: ActionType.DEACTIVATE_PRODUCT,
    payload: { product },
  };
}

function asyncGetProducts({
  getType = 'REPLACE',
  search,
  categoryId,
  warehouseId,
  sortBy,
  orderBy,
  paranoid = true,
  isPaginated = true,
  page,
  perPage,
}) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());

      const searchQ = search ? `search=${encodeURIComponent(search)}&` : '';
      const categoryIdQ =
        categoryId && categoryId !== '0'
          ? `categoryId=${encodeURIComponent(categoryId)}&`
          : '';
      const warehouseIdQ = warehouseId
        ? `warehouseId=${encodeURIComponent(warehouseId)}&`
        : '';
      const sortByQ = sortBy ? `sortBy=${encodeURIComponent(sortBy)}&` : '';
      const orderByQ = orderBy ? `orderBy=${encodeURIComponent(orderBy)}&` : '';
      const paranoidQ =
        paranoid === false ? `paranoid=${encodeURIComponent(false)}&` : '';
      const isPaginatedQ =
        isPaginated === false
          ? `isPaginated=${encodeURIComponent(false)}&`
          : '';
      const pageQ = page ? `page=${encodeURIComponent(page)}&` : '';
      const perPageQ = perPage ? `perPage=${encodeURIComponent(perPage)}&` : '';
      const allQuery = `?${searchQ}${categoryIdQ}${warehouseIdQ}${sortByQ}${orderByQ}${paranoidQ}${isPaginatedQ}${pageQ}${perPageQ}`;

      const { data } = await api.get(`/products${allQuery}`);
      if (getType === 'PUSH')
        dispatch(getAndPushProductsActionCreator(data.data));
      else dispatch(getAndReplaceProductsActionCreator(data.data));
      dispatch(setProductPaginationActionCreator(data.info));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateProduct(formData) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      await api.post('/products', formData);
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

function asyncEditProduct(productId, formData) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.patch(`/products/${productId}`, formData);
      dispatch(editProductActionCreator(data.data));
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

function asyncActivateProduct(productId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.put(`/products/${productId}?action=activate`);
      dispatch(activateProductActionCreator(data.data));
      dispatch(setAlertActionCreator());
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeactivateProduct(productId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.put(
        `/products/${productId}?action=deactivate`
      );
      dispatch(deactivateProductActionCreator(data.data));
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
  getAndReplaceProductsActionCreator,
  getAndPushProductsActionCreator,
  editProductActionCreator,
  activateProductActionCreator,
  deactivateProductActionCreator,
  asyncGetProducts,
  asyncCreateProduct,
  asyncEditProduct,
  asyncActivateProduct,
  asyncDeactivateProduct,
};

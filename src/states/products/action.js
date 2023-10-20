import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAlertActionCreator } from '../alert/action';
import { setProductPaginationActionCreator } from '../productPagination/action';
import api from '../../constants/api';

const ActionType = {
  GET_AND_REPLACE_PRODUCTS: 'GET_PRODUCTS',
  GET_AND_PUSH_PRODUCTS: 'GET_AND_PUSH_PRODUCTS',
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

function asyncGetProducts({
  getType = 'REPLACE',
  name,
  categoryId,
  sortBy,
  orderBy,
  isPaginated,
  page,
  perPage,
}) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());

      const nameQ = name ? `name=${encodeURIComponent(name)}&` : '';
      const categoryIdQ =
        categoryId && categoryId !== '0'
          ? `categoryId=${encodeURIComponent(categoryId)}&`
          : '';
      const sortByQ = sortBy ? `sortBy=${encodeURIComponent(sortBy)}&` : '';
      const orderByQ = orderBy ? `orderBy=${encodeURIComponent(orderBy)}&` : '';
      const isPaginatedQ =
        isPaginated === 'false'
          ? `isPaginated=${encodeURIComponent(false)}&`
          : `isPaginated=${encodeURIComponent(true)}&`;
      const pageQ = page ? `page=${encodeURIComponent(page)}&` : '';
      const perPageQ = perPage ? `perPage=${encodeURIComponent(perPage)}&` : '';
      const allQuery = `?${nameQ}${categoryIdQ}${sortByQ}${orderByQ}${isPaginatedQ}${pageQ}${perPageQ}`;

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

export {
  ActionType,
  getAndReplaceProductsActionCreator,
  getAndPushProductsActionCreator,
  asyncGetProducts,
};

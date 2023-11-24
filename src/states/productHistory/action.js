import api from '../../constants/api';
import { setProductHistoryPaginationActionCreator } from '../productHistoryPagination/action';

const ActionType = {
  GET_PRODUCT_HISTORY: 'GET_PRODUCT_HISTORY',
};

function getProductHistoryActionCreator(productHistory) {
  return {
    type: ActionType.GET_PRODUCT_HISTORY,
    payload: { productHistory },
  };
}

function asyncGetProductHistory({
  name,
  page,
  perPage,
  sortBy,
  orderBy,
  WH,
  productName,
  startDate,
  endDate,
} = {}) {
  return async (dispatch) => {
    try {
      const nameQ = name ? `name=${encodeURIComponent(name)}&` : '';
      const sortByQ = sortBy ? `sortBy=${encodeURIComponent(sortBy)}&` : '';
      const orderByQ = orderBy ? `orderBy=${encodeURIComponent(orderBy)}&` : '';
      const pageQ = page ? `page=${encodeURIComponent(page)}&` : '';
      const perPageQ = perPage ? `perPage=${encodeURIComponent(perPage)}&` : '';
      const WHQ = WH ? `WH=${encodeURIComponent(WH)}&` : '';
      const productNameQ = productName
        ? `productName=${encodeURIComponent(productName)}&`
        : '';
      const startDateQ = startDate
        ? `startDate=${encodeURIComponent(startDate)}&`
        : '';
      const endDateQ = endDate ? `endDate=${encodeURIComponent(endDate)}&` : '';

      const allQuery = `?${nameQ}${sortByQ}${orderByQ}${pageQ}${perPageQ}${WHQ}${productNameQ}${startDateQ}${endDateQ}`;

      const { data } = await api.get(`/product-history${allQuery}`);

      dispatch(getProductHistoryActionCreator(data?.data));
      dispatch(setProductHistoryPaginationActionCreator(data?.info));
    } catch (error) {
      console.log(error);
    }
  };
}

export { ActionType, getProductHistoryActionCreator, asyncGetProductHistory };

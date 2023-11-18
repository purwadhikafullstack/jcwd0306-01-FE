import api from '../../constants/api';
import { setReportPaginationActionCreator } from '../salesReportPagination/action';

const ActionType = {
  GET_ALL_REPORT: 'GET_ALL_REPORT',
};

function getAllReportActionCreator(reports) {
  return {
    type: ActionType.GET_ALL_REPORT,
    payload: { reports },
  };
}

function asyncGetReports({ name, page, perPage } = {}) {
  return async (dispatch) => {
    try {
      const nameQ = name ? `name=${encodeURIComponent(name)}&` : '';
      const pageQ = page ? `page=${encodeURIComponent(page)}&` : '';
      const perPageQ = perPage ? `perPage=${encodeURIComponent(perPage)}&` : '';
      const allQuery = `?${nameQ}${pageQ}${perPageQ}`;

      const { data } = await api.get(`/sales-reports${allQuery}`);

      dispatch(getAllReportActionCreator(data?.data?.data?.result));
      dispatch(
        setReportPaginationActionCreator(data?.data?.data?.paginationInfo)
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export { ActionType, getAllReportActionCreator, asyncGetReports };

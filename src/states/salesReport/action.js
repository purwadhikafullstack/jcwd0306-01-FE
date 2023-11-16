import api from '../../constants/api';

const ActionType = {
  GET_ALL_REPORT: 'GET_ALL_REPORT',
};

function getAllReportActionCreator(reports) {
  return {
    type: ActionType.GET_ALL_REPORT,
    payload: { reports },
  };
}

function asyncGetReports() {
  return async (dispatch) => {
    try {
      const { data } = await api.get('/sales-reports');

      dispatch(getAllReportActionCreator(data.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export { ActionType, getAllReportActionCreator, asyncGetReports };

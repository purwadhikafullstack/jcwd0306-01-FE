import { ActionType } from './action';

function reportPaginationReducer(reportPagination = {}, action = {}) {
  switch (action.type) {
    case ActionType.SET_REPORT_PAGINATION:
      return action.payload.info;

    default:
      return reportPagination;
  }
}

export default reportPaginationReducer;

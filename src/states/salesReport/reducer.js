import { ActionType } from './action';

function salesReportReducer(reports = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_ALL_REPORT:
      return action.payload.reports;

    default:
      return reports;
  }
}

export default salesReportReducer;

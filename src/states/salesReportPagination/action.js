const ActionType = {
  SET_REPORT_PAGINATION: 'SET_REPORT_PAGINATION',
};

function setReportPaginationActionCreator(info) {
  return {
    type: ActionType.SET_REPORT_PAGINATION,
    payload: { info },
  };
}

export { ActionType, setReportPaginationActionCreator };

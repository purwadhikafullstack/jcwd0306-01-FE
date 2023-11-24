const ActionType = {
  SET_PRODUCT_HISTORY_PAGINATION: 'SET_PRODUCT_HISTORY_PAGINATION',
};

function setProductHistoryPaginationActionCreator(info) {
  return {
    type: ActionType.SET_PRODUCT_HISTORY_PAGINATION,
    payload: { info },
  };
}

export { ActionType, setProductHistoryPaginationActionCreator };

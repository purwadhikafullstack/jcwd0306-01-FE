const ActionType = {
  SET_WAREHOUSE_PAGINATION: 'SET_WAREHOUSE_PAGINATION',
};

function setWarehousePaginationActionCreator(info) {
  return {
    type: ActionType.SET_WAREHOUSE_PAGINATION,
    payload: { info },
  };
}

export { ActionType, setWarehousePaginationActionCreator };

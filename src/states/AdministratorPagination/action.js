const ActionType = {
  SET_WAREHOUSE_ADMIN_PAGINATION: 'SET_WAREHOUSE_ADMIN_PAGINATION',
};

function setWarehouseAdminPaginationActionCreator(info) {
  return {
    type: ActionType.SET_WAREHOUSE_ADMIN_PAGINATION,
    payload: { info },
  };
}

export { ActionType, setWarehouseAdminPaginationActionCreator };

const ActionType = {
  SET_PRODUCT_PAGINATION: 'SET_PRODUCT_PAGINATION',
};

function setProductPaginationActionCreator(info) {
  return {
    type: ActionType.SET_PRODUCT_PAGINATION,
    payload: { info },
  };
}

export { ActionType, setProductPaginationActionCreator };

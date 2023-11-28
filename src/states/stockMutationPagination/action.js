const ActionType = {
  SET_STOCKMUTATION_PAGINATION: 'SET_STOCKMUTATION_PAGINATION',
};

function setStockMutationPaginationActionCreator(info) {
  return {
    type: ActionType.SET_STOCKMUTATION_PAGINATION,
    payload: { info },
  };
}

export { ActionType, setStockMutationPaginationActionCreator };

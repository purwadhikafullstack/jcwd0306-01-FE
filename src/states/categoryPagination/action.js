const ActionType = {
  SET_CATEGORY_PAGINATION: 'SET_CATEGORY_PAGINATION',
};

function setCategoryPaginationActionCreator(info) {
  return {
    type: ActionType.SET_CATEGORY_PAGINATION,
    payload: { info },
  };
}

export { ActionType, setCategoryPaginationActionCreator };

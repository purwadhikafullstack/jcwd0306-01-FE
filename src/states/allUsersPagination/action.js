const ActionType = {
  SET_ALL_USERS_PAGINATION: 'SET_ALL_USERS_PAGINATION',
};

function setAllUsersPaginationActionCreator(info) {
  return {
    type: ActionType.SET_ALL_USERS_PAGINATION,
    payload: { info },
  };
}

export { ActionType, setAllUsersPaginationActionCreator };

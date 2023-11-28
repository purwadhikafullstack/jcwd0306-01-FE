const ActionType = {
  SET_ADDRESS_PAGINATION: 'SET_ADDRESS_PAGINATION',
};

function setAddressPaginationActionCreator(info) {
  return {
    type: ActionType.SET_ADDRESS_PAGINATION,
    payload: { info },
  };
}

export { ActionType, setAddressPaginationActionCreator };

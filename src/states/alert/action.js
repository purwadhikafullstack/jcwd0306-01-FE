const ActionType = {
  SET_ALERT: 'SET_ALERT',
  UNSET_ALERT: 'UNSET_ALERT',
};

function setAlertActionCreator({
  val = { status: 'success', message: 'Success' },
  err = null,
} = {}) {
  const errVal = err
    ? {
        status: 'error',
        message: JSON.stringify(err.response?.data?.message || err?.message),
      }
    : {};

  return {
    type: ActionType.SET_ALERT,
    payload: { ...val, ...errVal, open: true },
  };
}

function unsetAlertActionCreator() {
  return {
    type: ActionType.UNSET_ALERT,
    payload: { open: false },
  };
}

export { ActionType, setAlertActionCreator, unsetAlertActionCreator };

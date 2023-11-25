import { setAlertActionCreator } from '../states/alert/action';
import { constant } from '../constants/constant';

export const socketListener = (
  socketConnection,
  dispatch,
  authUser,
  orderStatus = {}
) => {
  socketConnection.connect();
  [authUser?.WarehouseUser].forEach((whs) => {
    socketConnection.on(`warehouse-${whs.warehouseId}`, (msg) => {
      dispatch(
        setAlertActionCreator({
          val: { status: 'info', message: msg?.message },
        })
      );
      document.getElementById('startBubleNotification').click();
    });
  });
  socketConnection.on(`unpaid-${authUser?.id}`, (payload) => {
    dispatch(
      setAlertActionCreator({
        val: { status: 'info', message: payload?.message },
      })
    );
    dispatch({ type: constant.addUnpaid, payload: payload?.data });
    document.getElementById('startBubleNotification').click();
  });
  socketConnection.on(`notification-${authUser?.id}`, (payload) => {
    const { key, value } = payload;
    dispatch(
      setAlertActionCreator({
        val: { status: 'info', message: payload?.message },
      })
    );
    dispatch({
      type: constant.updateOrderStatus,
      payload: {
        [key]: orderStatus[key] + value,
        verifying: orderStatus.verifying - 1,
      },
    });
    document.getElementById('startBubleNotification').click();
  });
};

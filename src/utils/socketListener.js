import { setAlertActionCreator } from '../states/alert/action';
import { constant } from '../constants/constant';

export const socketListener = (
  socketConnection,
  dispatch,
  warehouses = [],
  userId = 0,
  orderStatus = {}
) => {
  socketConnection.connect();
  warehouses.forEach((whs) => {
    socketConnection.on(`warehouse-${whs.warehouseId}`, (msg) => {
      dispatch(
        setAlertActionCreator({
          val: { status: 'info', message: msg?.message },
        })
      );
      document.getElementById('startBubleNotification').click();
    });
  });
  socketConnection.on(`unpaid-${userId}`, (payload) => {
    dispatch(
      setAlertActionCreator({
        val: { status: 'info', message: payload?.message },
      })
    );
    dispatch({ type: constant.addUnpaid, payload: payload?.data });
    document.getElementById('startBubleNotification').click();
  });
  socketConnection.on(`notification-${userId}`, (payload) => {
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

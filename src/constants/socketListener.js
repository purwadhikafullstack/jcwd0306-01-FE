import { setAlertActionCreator } from '../states/alert/action';
import { constant } from './constant';

export const socketListener = (
  socketConnection,
  dispatch,
  warehouses = [],
  userId = 0
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
};

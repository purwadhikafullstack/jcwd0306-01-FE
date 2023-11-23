import { setAlertActionCreator } from '../../../../../states/alert/action';

const alertNewMsg = () =>
  setAlertActionCreator({
    val: { status: 'info', message: 'there is a new message' },
  });

export const socketListenerMsg = (
  setTotalUnread,
  socketConn,
  dispatch,
  setMessages,
  warehouseId = []
) => {
  warehouseId.forEach((whid) => {
    socketConn.on(`channel-WHID-${whid}`, ({ record }) => {
      setTotalUnread((unread) => unread + 1);
      dispatch(alertNewMsg());
      document.getElementById('startBubleNotification').click();
      setMessages((messages) => {
        const temp = [...messages];
        const index = temp.findIndex((val) => val.orderId === record.orderId);
        if (index !== -1) temp.splice(index, 1, record);
        else temp.push(record);
        return temp;
      });
    });
    socketConn.on(`updateMultiRecord-WHSE-${whid}`, (data) => {
      setTotalUnread((unread) => unread - data.total);
    });
  });
};

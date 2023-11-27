import { constant } from '../../constants/constant';

export const setDataFromSocket = (
  dispatch,
  searchParams,
  record,
  setMessages,
  messages
) => {
  try {
    const orderId = Number(searchParams.get('orderId'));
    const warehouseId = Number(searchParams.get('warehouseId'));
    if (
      (window.location.pathname.split('/')[1] === 'admin' &&
        warehouseId === record.warehouseId &&
        orderId === record.orderId) ||
      orderId === record.orderId
    ) {
      const rec = messages.find((val) => val?.id === record.id);
      if (!rec && orderId === record.orderId)
        setMessages((msg) => {
          if (msg[0].orderId === record.orderId) return [record, ...msg];
        });
    }
  } catch (error) {
    dispatch(constant.setError(error));
  }
};

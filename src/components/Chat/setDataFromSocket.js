import { constant } from '../../constants/constant';

export const setDataFromSocket = (
  dispatch,
  record,
  setMessages,
  messages,
  warehouseId,
  orderId
) => {
  try {
    console.log(
      222,
      orderId,
      record?.orderId,
      warehouseId,
      record?.warehouseId
    );
    if (
      (window.location.pathname.split('/')[1] === 'admin' &&
        warehouseId === record?.warehouseId &&
        orderId === record?.orderId) ||
      orderId === record?.orderId
    ) {
      const rec = messages.find((val) => val?.id === record?.id);
      console.log(`check 1`, !rec && orderId === record?.orderId);
      if (!rec && orderId === record?.orderId)
        setMessages((msg) => {
          console.log(msg[0].orderId);
          if (msg[0]?.orderId === record?.orderId) return [record, ...msg];
        });
    }
  } catch (error) {
    dispatch(constant.setError(error));
  }
};

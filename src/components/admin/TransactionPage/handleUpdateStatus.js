import { io } from 'socket.io-client';
import api from '../../../constants/api';
import { setAlertActionCreator } from '../../../states/alert/action';

const socketLocal = io(window.location.host);

const updateArray = (setArr, arr = [{}], transaction = {}) => {
  const temp = [...arr];
  const idx = arr.findIndex((val) => val.id === transaction.plain_id);
  temp.splice(idx, 1);
  setArr(temp);
};

const handleUpdateStatus = async (
  dispatch,
  setOpen,
  setShow,
  setIsLoading,
  setTransactions,
  transactions = [],
  adminSelector = {},
  transaction = {},
  status = 'unpaid'
) => {
  try {
    setIsLoading(true);
    const temp = { ...transaction };
    delete temp.paymentProof;
    await api.patch(`/order/${transaction?.id}`, {
      ...temp,
      status,
      adminId: adminSelector?.id,
    });
    updateArray(setTransactions, transactions, transaction);
    setOpen(false);
    if (status === 'unpaid' || status === 'processed')
      socketLocal.emit('update_status', -1);
  } catch (err) {
    setOpen(true);
    // dispatch(constant.setError(err));
    dispatch(setAlertActionCreator({ err }));
  } finally {
    setShow('');
    setIsLoading(false);
  }
};

export default handleUpdateStatus;

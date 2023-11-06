import api from '../../../constants/api';
import { constant } from '../../../constants/constant';

const updateArray = (setArr, arr = [{}], transaction = {}) => {
  const temp = [...arr];
  const idx = arr.findIndex((val) => val.id === transaction.plain_id);
  temp.splice(idx, 1);
  setArr(temp);
};

const handleUpdateStatus = async (
  dispatch,
  setOpen,
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
    const { data } = await api.patch(`/order/${transaction?.id}`, {
      ...temp,
      status,
      adminId: adminSelector?.id,
    });
    updateArray(setTransactions, transactions, transaction);
    setOpen(false);
  } catch (error) {
    dispatch(constant.setError(error));
  } finally {
    setIsLoading(false);
  }
};

export default handleUpdateStatus;

import api from '../../../constants/api';
import { constant } from '../../../constants/constant';
import { deleteUnpaid } from '../../../states/order/action';

const updateOrders = (orders = [], orderData = {}) => {
  const temp = [...orders];
  const index = orders.findIndex((order) => order?.id === orderData?.id);
  if (index !== -1) temp[index].status = 'cancelled';
  return temp;
};

export const handleCancel = async (
  setShowConfirmModal,
  setAction,
  nav,
  dispatch,
  setDisableButton,
  userSelector,
  orderData,
  setHiddenCancle,
  setOrders,
  unpaid = []
) => {
  setShowConfirmModal(true);
  setAction({
    fn: async () => {
      try {
        setDisableButton(false);
        await api.patch(`/order/${userSelector?.id}/${orderData?.id}`, {
          status: 'cancelled',
        });
        setShowConfirmModal(false);
        if (setHiddenCancle) setHiddenCancle(true);
        await dispatch(deleteUnpaid(unpaid, orderData?.id));
        await dispatch(
          constant.setSuccess('Success cancelling this transaction')
        );
        if (nav) setTimeout(() => nav(`/`), 2000);
        if (setOrders) setOrders((orders) => updateOrders(orders, orderData));
      } catch (error) {
        dispatch(constant.setError(error));
      } finally {
        setDisableButton(true);
      }
    },
    name: 'delete this order?',
    desc: 'You cannot retract after clicking Yes.',
  });
};

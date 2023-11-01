import api from '../../../constants/api';
import { constant } from '../../../constants/constant';
import { deleteUnpaid } from '../../../states/order/action';

export const handleCancel = async (
  setShowConfirmModal,
  setAction,
  nav,
  dispatch,
  setDisableButton,
  userSelector,
  orderData,
  setHiddenCancle,
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

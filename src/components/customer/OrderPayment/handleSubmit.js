import api from '../../../constants/api';
import { constant } from '../../../constants/constant';
import { deleteUnpaid } from '../../../states/order/action';

const formSetter = (imageUrl = '', image = {}, warehouseId = 0) => {
  const form = new FormData();
  form.append('imageUrl', imageUrl);
  form.append(`image`, image);
  form.append(`status`, 'verifying');
  form.append(`warehouseId`, warehouseId);
  return form;
};

const successUploadingMsg =
  'Success uploading image. You may now wait for payment verification';

export const handleSubmit = async (
  setDisableButton,
  setDisableSubmit,
  setShowConfirmModal,
  setHiddenCancel,
  setOrderData,
  nav,
  setAction,
  dispatch,
  image,
  imageUrl,
  orderData,
  unpaid,
  orderStatus
) => {
  setShowConfirmModal(true);
  setAction({
    fn: async () => {
      setDisableSubmit(true);
      const form = formSetter(imageUrl, image, orderData?.warehouseId);
      try {
        setDisableButton(true);
        await api
          .post(`/order/payment_proof/${orderData?.id}`, form)
          .then(() => dispatch(constant.setSuccess(successUploadingMsg)));
        setTimeout(() => nav(`/order-list`), 4000);
        setShowConfirmModal(false);
        setHiddenCancel(true);
        dispatch(deleteUnpaid(unpaid, orderData?.id));
        dispatch({
          type: constant.updateOrderStatus,
          payload: { verifying: orderStatus.verifying + 1 },
        });
        setOrderData({ ...orderData, status: 'verifying' });
      } catch (error) {
        dispatch(constant.setError(error));
        setTimeout(() => setDisableSubmit(false), 2000);
      } finally {
        setDisableButton(false);
      }
    },
    name: 'upload this foto',
    desc: 'You cannot cancel the order after clicking Yes.',
  });
};

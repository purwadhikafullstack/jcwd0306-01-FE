import api from '../../../constants/api';
import { constant } from '../../../constants/constant';

const formSetter = (imageUrl = '', image = {}) => {
  const form = new FormData();
  form.append('imageUrl', imageUrl);
  form.append(`image`, image);
  form.append(`status`, 'verifying');
  return form;
};

export const handleSubmit = async (
  setDisableButton,
  setDisableSubmit,
  setShowConfirmModal,
  setHiddenCancel,
  nav,
  setAction,
  dispatch,
  image,
  imageUrl,
  orderData
) => {
  setShowConfirmModal(true);
  setAction({
    fn: async () => {
      setDisableSubmit(true);
      const form = formSetter(imageUrl, image);
      try {
        setDisableButton(true);
        await api
          .post(`/order/payment_proof/${orderData?.id}`, form)
          .then(() =>
            dispatch(
              constant.setSuccess(
                'Success uploading image. You may now wait for payment verification'
              )
            )
          );
        setTimeout(() => nav(`/order-list`), 2000);
        setShowConfirmModal(false);
        setHiddenCancel(true);
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

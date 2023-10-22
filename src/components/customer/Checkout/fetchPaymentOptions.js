import api from '../../../constants/api';
import { setAlertActionCreator } from '../../../states/alert/action';

export const fetchPaymentOptions = async (
  address,
  cart,
  setShippingOptions,
  setOriginWarehouse,
  setDisableButton,
  dispatch
) => {
  dispatch(
    setAlertActionCreator({
      val: { status: 'info', message: 'fetching data' },
    })
  );
  setDisableButton(true);
  const weight = cart.reduce(
    (acc, val) => acc + val.quantity * val.Product.weight,
    0
  );
  const { data } = await api.post(`/user_address/payment_option`, {
    longitude: address?.longitude,
    latitude: address?.latitude,
    cityId: address?.cityId,
    weight,
  });
  setShippingOptions(data.method);
  setOriginWarehouse(data.origin_details);
  setDisableButton(false);
};

import api from '../../../constants/api';
import { setAlertActionCreator } from '../../../states/alert/action';

export const fetchShippingOptions = async (
  address,
  cart,
  setShippingOptions,
  setIsLoading,
  setOriginWarehouse,
  setDisableButton,
  setShippingMethod
) => {
  setIsLoading(true);
  setDisableButton(true);
  const weight = cart.reduce(
    (acc, val) => acc + val.quantity * val.Product.weight,
    0
  );
  const { data } = await api.post(`/user_address/shipping_option`, {
    longitude: address?.longitude,
    latitude: address?.latitude,
    cityId: address?.cityId,
    weight,
  });
  setShippingOptions(data.method);
  setOriginWarehouse(data.origin_details);
  setShippingMethod({});
  setIsLoading(false);
  setDisableButton(false);
};

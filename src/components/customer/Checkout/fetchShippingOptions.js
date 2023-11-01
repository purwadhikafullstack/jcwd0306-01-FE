import api from '../../../constants/api';
import { constant } from '../../../constants/constant';

const weightCalculator = (cart = []) =>
  cart.reduce((acc, val) => acc + val.quantity * val.Product.weight, 0);

const isDataNotValid = (address) => {
  if (
    address?.longitude === null ||
    address?.longitude === undefined ||
    address?.latitude === null ||
    address?.latitude === undefined ||
    address?.cityId === null ||
    address?.cityId === undefined
  )
    return true;
  return false;
};

export const fetchShippingOptions = async (
  address,
  cart,
  setShippingOptions,
  setIsLoading,
  setOriginWarehouse,
  setDisableButton,
  setShippingMethod,
  dispatch
) => {
  setIsLoading(true);
  setDisableButton(true);
  const weight = weightCalculator(cart);
  try {
    if (isDataNotValid(address)) throw new Error(`no address`);
    if (!weight) throw new Error(`no item in cart weight`);
    const { data } = await api.post(`/user_address/shipping_option`, {
      longitude: address?.longitude,
      latitude: address?.latitude,
      cityId: address?.cityId,
      postalCode: address?.postalCode,
      weight,
    });
    if (!data.method || !data.origin_details) throw new Error('API ERROR');
    setShippingOptions(data.method);
    setOriginWarehouse(data.origin_details);
    setShippingMethod({});
  } catch (error) {
    // if (typeof error?.message !== 'object') dispatch(constant.setError(error));
  } finally {
    setIsLoading(false);
    setDisableButton(false);
  }
};

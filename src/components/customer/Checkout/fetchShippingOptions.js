import api from '../../../constants/api';
import { setAlertActionCreator } from '../../../states/alert/action';

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
  const weight = cart.reduce(
    (acc, val) => acc + val.quantity * val.Product.weight,
    0
  );
  try {
    if (
      address?.longitude === null ||
      address?.longitude === undefined ||
      address?.latitude === null ||
      address?.latitude === undefined ||
      address?.cityId === null ||
      address?.cityId === undefined
    ) {
      throw new Error(`no address`);
    }
    if (!weight) throw new Error(`no item in cart weight`);
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
    return setDisableButton(false);
  } catch (error) {
    setIsLoading(false);
    console.log(error?.message);
    // dispatch(
    //   setAlertActionCreator({
    //     val: { status: 'error', message: error?.message },
    //   })
    // );
  }
};

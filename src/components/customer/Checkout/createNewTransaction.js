import api from '../../../constants/api';

export const createNewTransaction = async (
  nav,
  setDisableButton,
  userId = 0,
  cart = [],
  directBuyItem = {},
  address = {},
  shippingMethod = {},
  originWarehouse = {},
  grandTotal = 0,
  status = 'unpaid'
) => {
  try {
    setDisableButton(true);
    const products = directBuyItem?.quantity ? [directBuyItem] : cart;
    const { data } = await api.post(`/order/new/${userId}`, {
      products,
      userAddressId: address.id,
      shippingMethod: shippingMethod.name || 'jne OKE',
      shippingPrice: Number(shippingMethod.price) || '15000',
      warehouseId: originWarehouse.warehouseId || 1,
      total: grandTotal,
      status,
      userId,
    });
    nav(`/payment/1`);
  } catch (error) {
    console.log(error);
  } finally {
    setDisableButton(false);
  }
};

import api from '../../../constants/api';

export const createNewTransaction = async (
  nav,
  userId = 0,
  cart = [],
  directBuyItem = {},
  address = {},
  shippingMethod = {},
  originWarehouse = {},
  grandTotal = 0
) => {
  const products = directBuyItem?.quantity ? [directBuyItem] : cart;
  const { data } = await api.post(`/order/new/${userId}`, {
    products,
    address,
    shippingMethod,
    originWarehouse,
    grandTotal,
  });
  console.log(data);
};

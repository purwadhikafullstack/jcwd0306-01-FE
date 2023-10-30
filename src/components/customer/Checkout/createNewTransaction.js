import api from '../../../constants/api';
import { constant } from '../../../constants/constant';
import { deleteFromCart } from '../../../states/cart/action';
import { addUnpaid } from '../../../states/order/action';

const removeItemFromCart = (products = []) => {
  const temp = [];
  for (let i = 0; i < products.length; i += 1) temp.push(products[i].productId);
  return temp;
};

const checkData = (
  shippingMethod,
  address = {},
  products = [],
  grandTotal = 0
) => {
  if (!shippingMethod.price)
    throw new Error('You have not choose shipping method');
  if (!address?.id) throw new Error('You have not choose destination');
  if (!products.length) throw new Error('No products here');
  if (grandTotal < 1) throw new Error('Application error');
};

export const createNewTransaction = async (
  nav,
  dispatch,
  setDisableButton,
  userId = 0,
  allItemsInCart = [],
  cart = [],
  directBuyItem = {},
  address = {},
  shippingMethod = {},
  originWarehouse = {},
  grandTotal = 0,
  unpaid = [],
  status = 'unpaid'
) => {
  try {
    setDisableButton(true);
    const products = directBuyItem?.quantity ? [directBuyItem] : cart;
    checkData(shippingMethod, address, products, grandTotal);
    const { data } = await api.post(`/order/new/${userId}`, {
      products,
      userAddressId: address.id,
      shippingMethod: shippingMethod.name,
      shippingPrice: Number(shippingMethod.price),
      warehouseId: originWarehouse.warehouseId,
      total: grandTotal,
      status,
      userId,
    });
    await dispatch(
      deleteFromCart(allItemsInCart, removeItemFromCart(products), userId)
    );
    data.OrderProducts = products;
    dispatch(addUnpaid(unpaid, data));
    nav(`/payment`, { state: data });
  } catch (error) {
    dispatch(constant.setError(error));
  } finally {
    setDisableButton(false);
  }
};

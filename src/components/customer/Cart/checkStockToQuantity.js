import api from '../../../constants/api';
import { setAlertActionCreator } from '../../../states/alert/action';

const isStockAvailable = (array = [], reload = false) => {
  array.forEach((product) => {
    if (product.isChecked) {
      if (product.quantity > product.stock) {
        if (reload)
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        throw new Error('an item is out of stock');
      }
    }
  });
};

export const checkStockToQuantity = async (
  userId,
  setDisableButton,
  dispatch,
  nav,
  cart = []
) => {
  try {
    setDisableButton(true);
    if (cart.length === 0) throw new Error('No item in Cart');
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].isChecked) break;
      if (cart[i] === cart[cart.length - 1])
        throw new Error('No item is selected');
    }
    isStockAvailable(cart);
    const { data } = await api.get(`/cart/${userId}`);
    isStockAvailable(data.rows, true);
    return nav(`/cart/shipment`);
  } catch (error) {
    dispatch(
      setAlertActionCreator({
        val: { status: 'error', message: error?.message },
      })
    );
  } finally {
    setDisableButton(false);
  }
};

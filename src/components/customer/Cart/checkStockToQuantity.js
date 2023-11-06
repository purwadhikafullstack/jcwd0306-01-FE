import { setAlertActionCreator } from '../../../states/alert/action';

export const checkStockToQuantity = (dispatch, nav, cart = []) => {
  try {
    if (cart.length === 0) throw new Error('No item in Cart');
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].isChecked) break;
      if (cart[i] === cart[cart.length - 1])
        throw new Error('No item is selected');
    }
    cart.forEach((product) => {
      if (product.isChecked) {
        if (product.quantity > product.stock)
          throw new Error('an item is out of stock');
      }
    });
    return nav(`/cart/shipment`);
  } catch (error) {
    dispatch(
      setAlertActionCreator({
        val: { status: 'error', message: error?.message },
      })
    );
  }
};

import { setAlertActionCreator } from '../../../states/alert/action';

export const checkStockToQuantity = (dispatch, nav, cart = []) => {
  try {
    cart.forEach((product) => {
      console.log(product.stock > product.quantity);
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

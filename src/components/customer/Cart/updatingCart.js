import { updateCart } from '../../../states/cart/action';
import { setAlertActionCreator } from '../../../states/alert/action';

export const updatingCart = (dispatch, cart = [], product = {}, userId = 0) =>
  setTimeout(async () => {
    try {
      await dispatch(updateCart(cart, product, userId));
    } catch (error) {
      dispatch(
        setAlertActionCreator({
          val: { status: 'error', message: error?.message },
        })
      );
    }
  }, 500);

import { setAlertActionCreator } from '../../../states/alert/action';

export const checkCartLength = (cart, dispatch, nav) =>
  setTimeout(() => {
    if (!cart.length) {
      dispatch(
        setAlertActionCreator({
          val: {
            status: 'error',
            message: 'It seems like there is no item here',
          },
        })
      );
      setTimeout(() => nav(`/cart`), 1000);
    }
  }, 1500);

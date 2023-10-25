import { setAlertActionCreator } from '../../../states/alert/action';
import { updateCart } from '../../../states/cart/action';

export const setCheckAllItems = async (
  cart,
  statusChecked,
  dispatch,
  checkBoxes,
  temp,
  userId
) => {
  cart.forEach((item) => {
    item.isChecked = statusChecked;
    temp.push(item);
  });
  try {
    await dispatch(updateCart(temp, { ...temp[0], quantity: 0 }, userId));
  } catch (error) {
    await dispatch(
      setAlertActionCreator({
        val: { status: 'error', message: error?.message },
      })
    );
  }
  checkBoxes.forEach((checkBox) => {
    if (checkBox.checked !== statusChecked) checkBox.click();
  });
};

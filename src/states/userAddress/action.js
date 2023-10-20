import api from '../../constants/api';
import { constant } from '../../constants/constant';

const updateValue = (arr = [], item = {}) => {
  const index = arr.findIndex((val) => val.productId === item.id);
  arr.splice(index, 1, item);
  return arr;
};

export const addAddress =
  (newAddress = {}, userId = 0) =>
  async (dispatch) => {
    try {
      const { newAddressWithID } = await api.post(
        `/user_address/new/${userId}`,
        newAddress
      );
      await dispatch({ type: constant.addAddress, payload: newAddressWithID });
      return constant.success;
    } catch (error) {
      return error?.message;
    }
  };

export const updateAddress =
  (allValues = [], updatedItem = {}) =>
  async (dispatch) => {
    try {
      await api.patch(`/user_address/${updatedItem.id}`);
      await dispatch({
        type: constant.updateAddress,
        payload: updateValue([...allValues], updatedItem),
      });
    } catch (error) {
      return error?.message;
    }
  };

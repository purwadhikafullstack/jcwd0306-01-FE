import api from '../../constants/api';
import { constant } from '../../constants/constant';

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` },
};

export const updateCart =
  (allValues = [], updatedItem = {}, userId = 0) =>
  async (dispatch) => {
    try {
      const index = allValues.findIndex(
        (val) => val.productId === updatedItem.productId
      );
      const temp = [...allValues];
      if (index !== -1) {
        temp[index].quantity += updatedItem.quantity;
        temp[index].isChecked = updatedItem.isChecked;
        await api.post(`/cart/${userId}`, { values: temp }, config);
        await dispatch({
          type: constant.updateProductOnCart,
          payload: temp,
        });
        return constant.success;
      }
      if (allValues.length >= 20)
        throw new Error('Number of item in cart reach limit (20)');
      await api.post(`/cart/${userId}`, { values: [updatedItem] }, config);
      await dispatch({
        type: constant.addProductToCart,
        payload: updatedItem,
      });
      return constant.success;
    } catch (err) {
      return err?.message;
    }
  };

export const deleteFromCart =
  (allValues = [], productId = 0 || [], userId = 0) =>
  async (dispatch) => {
    try {
      const temp = typeof productId === `object` ? [] : [...allValues];
      const index = allValues.findIndex((val) => val.productId === productId);
      if (index !== -1) {
        temp.splice(index, 1);
      }
      await api.delete(`/cart/${userId}`, {
        params: { productId },
      });
      await dispatch({
        type: constant.deleteProductFromCart,
        payload: temp,
      });
      return constant.success;
    } catch (err) {
      return err?.message;
    }
  };

import { constant } from '../../constants/constant';

export const addUnpaid =
  (allUnpaidOrder = [], data = {}) =>
  async (dispatch) => {
    try {
      await dispatch({
        type: constant.updateUnpaid,
        payload: [...allUnpaidOrder, data],
      });
      return constant.success;
    } catch (error) {
      return dispatch(constant.setError(error));
    }
  };

export const deleteUnpaid =
  (allUnpaidOrder = [], orderId = 0) =>
  async (dispatch) => {
    try {
      const temp = [...allUnpaidOrder];
      const index = allUnpaidOrder.findIndex((order) => order.id === orderId);
      temp.splice(index, 1);
      await dispatch({ type: constant.updateUnpaid, payload: temp });
      return constant.success;
    } catch (error) {
      return dispatch(constant.setError(error));
    }
  };

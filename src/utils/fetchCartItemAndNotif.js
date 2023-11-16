import api from '../constants/api';
import { constant } from '../constants/constant';

export const fetchCartItemAndNotif = async (
  authUser,
  setWarehouseId,
  dispatch
) => {
  try {
    if (authUser?.id) {
      const { data } = await api.get(`/user/details/${authUser?.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const tempWarehouse = [];
      data.WarehouseUsers.forEach((val) => tempWarehouse.push(val.warehouseId));
      setWarehouseId(data.WarehouseUsers);
      console.log(tempWarehouse);
      console.log(data);
      dispatch({
        type: constant.setWarehouseUser,
        payload: tempWarehouse,
      });
      dispatch({ type: constant.updateOrderStatus, payload: data });
      dispatch({ type: constant.updateProductOnCart, payload: data.Carts });
      dispatch({ type: constant.updateUnpaid, payload: data.UserOrder });
    }
  } catch (error) {
    dispatch(constant.setError(error));
  }
};

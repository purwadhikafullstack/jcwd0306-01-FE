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
      if (data.WarehouseUser) {
        const tempWarehouse = [data.WarehouseUser.warehouseId]; // ganti di sini aja kalo dari one to one ke one to many
        setWarehouseId([data.WarehouseUser]); // ganti di sini aja kalo dari one to one ke one to many
        dispatch({
          type: constant.setWarehouseUser,
          payload: tempWarehouse,
        });
      }
      dispatch({ type: constant.updateOrderStatus, payload: data });
      dispatch({ type: constant.updateProductOnCart, payload: data.Carts });
      dispatch({ type: constant.updateUnpaid, payload: data.UserOrder });
    }
  } catch (error) {
    dispatch(constant.setError(error));
  }
};

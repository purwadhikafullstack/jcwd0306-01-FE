import api from '../../../../constants/api';
import { constant } from '../../../../constants/constant';
import { setAlertActionCreator } from '../../../../states/alert/action';

const changeDefault = (setAddresses, temp = [], destination = {}) => {
  const index = temp.findIndex((address) => address.isDefault);
  temp.splice(index, 1, { ...temp[index], isDefault: 0 });
  const newDefaultIndex = temp.findIndex(
    (address) => address.id === destination.id
  );
  temp.splice(newDefaultIndex, 1, { ...destination, isDefault: 1 });
  setAddresses(temp);
};

export const handleDelete = async (
  dispatch,
  setAddresses,
  index,
  addresses = [],
  destination = {},
  userId = 0,
  setOpen
) => {
  try {
    await api.delete(`/user_address/${userId}/${destination?.id}`);
    const temp = [...addresses];
    temp.splice(index, 1);
    setAddresses(temp);
    setOpen()
  } catch (error) {
    dispatch(setAlertActionCreator(error?.response?.data || error?.message));
  }
};

export const handleSetDefault = async (
  dispatch,
  setAddresses,
  userId = 0,
  addresses = [],
  destination = {}
) => {
  try {
    const temp = [...addresses];
    await api.patch(`/user_address/new_default/${userId}/${destination.id}`, {
      isDefault: 1,
    });
    await dispatch({
      type: constant.selectAddress,
      payload: { ...destination, isDefault: 1 },
    });
    changeDefault(setAddresses, temp, destination);
  } catch (error) {
    dispatch(setAlertActionCreator(error?.response?.data || error?.message));
  }
};

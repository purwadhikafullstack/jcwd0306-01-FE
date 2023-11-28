import api from '../../../../constants/api';
import { constant } from '../../../../constants/constant';

export const fetchAddresses = async (
  userSelector,
  setAddresses,
  dispatch,
  name
) => {
  try {
    if (userSelector?.id) {
      const { data } = await api.get(
        `/user_address/${userSelector?.id}?name=${name}`
      );
      setAddresses(data.rows);
    }
  } catch (error) {
    dispatch(constant.setError(error));
  }
};

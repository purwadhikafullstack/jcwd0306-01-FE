import api from '../../../constants/api';
import { constant } from '../../../constants/constant';

const setStatus = (searchParams) => {
  if (searchParams.get(`substatus`)) return searchParams.get(`substatus`);
  if (searchParams.get(`status`) === 'ongoing') return constant.status.ongoing;
  if (searchParams.get(`status`) === 'failed') return constant.status.failed;
  return searchParams.get(`status`);
};

export const fetchOrder = async (
  searchParams,
  setOrders,
  setTotalPage,
  userSelector,
  setIsLoading,
  dispatch
) => {
  try {
    setIsLoading(true);
    const { data } = await api.get(`/order/user/${userSelector?.id}`, {
      params: {
        page: searchParams.get('page') || 1,
        status: setStatus(searchParams),
        name: searchParams.get(`name`),
      },
    });
    setTotalPage(data.number_of_pages);
    setOrders(data.rows);
  } catch (error) {
    dispatch(constant.setError(error));
  } finally {
    setIsLoading(false);
  }
};

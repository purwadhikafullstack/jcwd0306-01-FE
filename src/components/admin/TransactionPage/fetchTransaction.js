import api from '../../../constants/api';
import { constant } from '../../../constants/constant';

const setStatus = (searchParams) => {
  if (searchParams.get(`substatus`)) return searchParams.get(`substatus`);
  if (searchParams.get(`status`) === 'ongoing') return constant.status.ongoing;
  if (searchParams.get(`status`) === 'failed') return constant.status.failed;
  return searchParams.get(`status`);
};

export const fetchTransaction = async (
  setIsLoading,
  setTransactions,
  setTotalPage,
  setCount,
  dispatch,
  searchParams
) => {
  try {
    setIsLoading(true);
    const { data } = await api.get(`/order`, {
      params: {
        page: searchParams.get('page') || 1,
        limit: searchParams.get(`limit`) || 5,
        status: setStatus(searchParams),
        text: searchParams.get(`name`),
      },
    });
    setTransactions(data.rows);
    setTotalPage(data.number_of_pages);
    setCount(data.count);
  } catch (error) {
    dispatch(constant.setError(error));
  } finally {
    setIsLoading(false);
  }
};

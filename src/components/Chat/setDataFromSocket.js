import { constant } from '../../constants/constant';

export const setDataFromSocket = (
  dispatch,
  searchParams,
  record,
  setMessages,
  messages = []
) => {
  try {
    const rec = messages.find((val) => val?.id === record.id);
    if (!rec) setMessages((msg) => [record, ...msg]);
  } catch (error) {
    dispatch(constant.setError(error));
  }
};

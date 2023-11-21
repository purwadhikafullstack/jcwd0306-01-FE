import api from '../../constants/api';

export const fetchMessages = async (
  userId,
  searchParams,
  setMessages,
  page,
  totalData
) => {
  const receiverId = searchParams.get('receiverId');
  const orderId = searchParams.get('orderId');
  const { data } = await api.get(
    `/chat/${receiverId || userId}/${orderId}?page=${page || 1}`
  );
  setMessages(data.rows);
  totalData.current = data.count;
};

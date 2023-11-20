import api from '../../constants/api';

export const fetchMessages = async (
  userId,
  searchParams,
  setMessages,
  page,
  totalData
) => {
  console.log(`executed`, page);
  const { data } = await api.get(
    `/chat/${userId}/${searchParams.get('orderId')}?page=${page || 1}`
  );
  setMessages(data.rows);
  totalData.current = data.count;
};

import api from '../../constants/api';

export const fetchMessages = async (userId, searchParams, setMessages) => {
  const { data } = await api.get(
    `/chat/${userId}/${searchParams.get('orderId')}`
  );
  setMessages(data.rows);
};

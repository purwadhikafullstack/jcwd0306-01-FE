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
  setMessages((msg) => {
    const temp = [...msg];
    data.rows.forEach((val) => {
      const rec = msg.find((item) => item.id === val.id);
      if (!rec) temp.push(val);
    });
    return temp;
  });
  totalData.current = data.count;
};

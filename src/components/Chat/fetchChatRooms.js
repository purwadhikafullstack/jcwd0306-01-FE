import api from '../../constants/api';

export const fetchChatRooms = async (userId, setChatRooms) => {
  const { data } = await api.get(`/chat/rooms/${userId}`);
  setChatRooms(data.rows);
};

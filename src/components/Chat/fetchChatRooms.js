import api from '../../constants/api';
import { isRoomDisplayed } from './IsRoomDisplayed';

export const fetchChatRooms = async (userId, setChatRooms, searchParams) => {
  const orderId = Number(searchParams.get('orderId'));
  const warehouseId = Number(searchParams.get('warehouseId'));
  const { data } = await api.get(`/chat/rooms/${userId}`);
  if (!isRoomDisplayed(searchParams, data.rows))
    setChatRooms([
      { orderId, warehouseId, id: Math.random() * 100000 },
      ...data.rows,
    ]);
  else setChatRooms(data.rows);
};

import api from '../../../constants/api';

export const fetchRooms = async (whId, setRooms) => {
  const { data } = await api.get('/chat/all', {
    params: { warehouseId: whId },
  });
  setRooms(data.rows);
};

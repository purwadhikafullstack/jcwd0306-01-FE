export const isRoomDisplayed = (searchParams, chatRooms) => {
  const orderId = Number(searchParams.get('orderId'));
  if (orderId && orderId !== 'null') {
    const rec = chatRooms.find((room) => room.orderId === orderId);
    if (rec) return true;
    return false;
  }
  return false;
};

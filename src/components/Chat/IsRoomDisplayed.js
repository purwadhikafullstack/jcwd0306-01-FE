export const isRoomDisplayed = (searchParams, chatRooms, setChatRooms) => {
  const orderId = Number(searchParams.get('orderId'));
  const warehouseId = Number(searchParams.get('warehouseId'));
  if (orderId && orderId !== 'null') {
    const rec = chatRooms.find((room) => room.orderId === orderId);
    if (!rec)
      setChatRooms((room) => [
        { orderId, warehouseId, id: Math.random() * 100000 },
        ...room,
      ]);
  }
};

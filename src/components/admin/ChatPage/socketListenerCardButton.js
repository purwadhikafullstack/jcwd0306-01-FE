const updateRooms = (setRooms, record) => {
  setRooms((room) => {
    const temp = [...room];
    const index = temp.findIndex((val) => val.orderId === record.orderId);
    if (index !== -1) temp.splice(index, 1, record);
    else temp.push(record);
    return temp;
  });
};

const updateIsReadRoom = (setRooms, data) =>
  setRooms((rooms) => {
    const temp = [...rooms];
    temp.forEach((room) => {
      if (room.orderId === data.orderId) room.isRead = true;
    });
    return temp;
  });

export const socketListenerCardButton = (
  socketConn,
  setRooms,
  searchParams,
  warehouseId,
  userId
) => {
  const orderId = Number(searchParams.get('orderId'));
  const whseId = Number(searchParams.get('warehouseId'));
  if (window.location.pathname.split(`/`)[1] === 'admin') {
    warehouseId.forEach((whid) => {
      socketConn.on(`channel-WHID-${whid}`, ({ record }) => {
        document.getElementById('startBubleNotification').click();
        if (orderId !== record.orderId || whid !== whseId)
          updateRooms(setRooms, record);
      });
      socketConn.on(`updateMultiRecord-WHSE-${whid}`, (data) =>
        updateIsReadRoom(setRooms, data)
      );
    });
  } else {
    socketConn.on(`channel-USER-${userId}`, ({ record }) => {
      if (orderId !== record.orderId) updateRooms(setRooms, record);
    });
    socketConn.on(`updateMultiRecord-USER-${userId}`, (data) => {
      updateIsReadRoom(setRooms, data);
    });
  }
};

import { NotificationsNoneOutlined } from '@mui/icons-material';
import { IconButton, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import api from '../../../../constants/api';

const socketConn = io(import.meta.env.VITE_API_BASE_URL);

function NotificationButton() {
  const [notification, setNotification] = useState(0);
  const userSelector = useSelector((state) => state.authUser);
  const fetchTotalUnread = async () => {
    const { data } = await api.get(`/order`, {
      params: {
        ...(userSelector?.isAdmin
          ? {}
          : {
              warehouseId: userSelector?.WarehouseUser?.warehouseId,
            }),
        status: 'verifying',
      },
    });
    setNotification(data.count);
  };
  useEffect(() => {
    socketConn.connect();
    if (userSelector?.WarehouseUser || userSelector?.isAdmin) {
      fetchTotalUnread();
      socketConn.on(
        `warehouse-${userSelector?.WarehouseUser?.warehouseId}`,
        () => setNotification((total) => total + 1)
      );
      socketConn.on(
        `warehouseNotification-${userSelector?.WarehouseUser?.warehouseId}`,
        (number) => {
          console.log(number);
          setNotification((total) => total + number);
        }
      );
    }
  }, [userSelector]);
  return (
    <div className="position-relative">
      {notification > 0 ? (
        <span
          className="text-light text-center position-absolute bg-danger z-2 text-decoration-none rounded-pill"
          style={{
            top: '1px',
            right: '0px',
            minWidth: '11px',
            height: '15px',
            fontSize: '11px',
            padding: '0 3px',
          }}
        >
          {notification}
        </span>
      ) : null}
      <Link href="/admin/transactions?status=ongoing&page=1&substatus=verifying">
        <IconButton color="text">
          <NotificationsNoneOutlined />
        </IconButton>
      </Link>
    </div>
  );
}

export default NotificationButton;

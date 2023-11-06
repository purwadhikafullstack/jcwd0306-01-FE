import { NotificationsNoneOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { NotificationShowUp } from './NotificationButton/NotificationShowUp';
import { orderStatusCalculator } from './NotificationButton/orderStatusCalculator';

function NotificationButton() {
  const [unpaidOrder, setUnpaidOrder] = useState([]);
  const [show, setShow] = useState(false);
  const unpaid = useSelector((state) => state.order);
  const orderStatus = useSelector((state) => state.orderStatus);

  const totalNotification = orderStatusCalculator(unpaid, orderStatus);

  useEffect(() => {
    setUnpaidOrder(unpaid);
  }, [unpaid]);

  return (
    <div
      className="position-relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {totalNotification ? (
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
          {totalNotification}
        </span>
      ) : null}
      <IconButton color="text">
        <NotificationsNoneOutlined />
      </IconButton>
      <NotificationShowUp
        show={show}
        setShow={setShow}
        unpaidOrder={unpaidOrder}
      />
    </div>
  );
}

export default NotificationButton;

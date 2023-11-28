import { EmailOutlined } from '@mui/icons-material';
import { IconButton, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import api from '../../../../constants/api';

const socketConn = io(import.meta.env.VITE_API_BASE_URL);

function MessageButton() {
  const [totalUnread, setTotalUnread] = useState(0);
  const userSelector = useSelector((state) => state.authUser);
  const fetchUnread = async () => {
    const { data } = await api.get(`/chat/unread/${userSelector?.id}`);
    setTotalUnread(data.totalUnread);
  };

  useEffect(() => {
    socketConn.connect();
    if (userSelector?.id) {
      fetchUnread();
      socketConn.on(`updateMultiRecord-USER-${userSelector?.id}`, (read) =>
        setTotalUnread((unread) => unread - read.total)
      );
      socketConn.on(`channel-USER-${userSelector?.id}`, () =>
        setTotalUnread((unread) => unread + 1)
      );
    }
  }, [userSelector]);
  return (
    <div
      className="position-relative"
      // onMouseEnter={() => setShow(true)}
      // onMouseLeave={() => setShow(false)}
    >
      {totalUnread > 0 ? (
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
          {totalUnread}
        </span>
      ) : null}

      <Link href="/chatroom">
        <IconButton color="text">
          <EmailOutlined />
        </IconButton>
      </Link>
    </div>
  );
}

export default MessageButton;

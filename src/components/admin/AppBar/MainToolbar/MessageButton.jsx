import { EmailOutlined } from '@mui/icons-material';
import { IconButton, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../../../../constants/api';
import { ChatRoomShowUp } from './MessageButton/ChatRoomShowUp';
import { socketListenerMsg } from './MessageButton/socketListenerMsg';

const socketConn = io(import.meta.env.VITE_API_BASE_URL);

function MessageButton() {
  const warehouseId = useSelector((state) => state.warehouseUser);
  const userSelector = useSelector((state) => state.authUser);
  const [totalUnread, setTotalUnread] = useState(0);
  const [messages, setMessages] = useState([]);
  const [showRoom, setShowRoom] = useState(false);
  const dispatch = useDispatch();
  const fetchUnreadMsg = async () => {
    const { data } = await api.get(`/chat/inbox`, { params: { warehouseId } });
    setTotalUnread(data.totalUnread);
    setMessages(data.rows);
  };

  useEffect(() => {
    if (userSelector?.id && warehouseId.length) fetchUnreadMsg();
    socketConn.connect();
    socketListenerMsg(
      setTotalUnread,
      socketConn,
      dispatch,
      setMessages,
      warehouseId
    );
  }, [userSelector?.id, warehouseId]);
  return (
    <div
      className="position-relative"
      onMouseEnter={() => setShowRoom(true)}
      onMouseLeave={() => setShowRoom(false)}
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
      <Link href="/admin/messages">
        <IconButton color="text">
          <EmailOutlined />
        </IconButton>
      </Link>
      <ChatRoomShowUp
        showRoom={showRoom}
        setShowRoom={setShowRoom}
        messages={messages}
      />
    </div>
  );
}

export default MessageButton;

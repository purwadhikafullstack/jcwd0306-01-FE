import { EmailOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import api from '../../../../constants/api';
import { ChatRoomShowUp } from './MessageButton/ChatRoomShowUp';

function MessageButton() {
  const warehouseId = useSelector((state) => state.warehouseUser);
  const userSelector = useSelector((state) => state.authUser);
  const [totalUnread, setTotalUnread] = useState(0);
  const [messages, setMessages] = useState([]);
  const [showRoom, setShowRoom] = useState(false);
  const fetchUnreadMsg = async () => {
    const { data } = await api.get(`/chat/inbox`, { params: { warehouseId } });
    setTotalUnread(data.totalUnread);
    setMessages(data.rows);
  };
  useEffect(() => {
    if (userSelector?.id && warehouseId.length) fetchUnreadMsg();
  }, [userSelector?.id, warehouseId]);
  return (
    <div
      className="position-relative"
      onMouseEnter={() => setShowRoom(true)}
      onMouseLeave={() => setShowRoom(false)}
    >
      {totalUnread ? (
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
      <IconButton color="text">
        <EmailOutlined />
      </IconButton>
      <ChatRoomShowUp
        showRoom={showRoom}
        setShowRoom={setShowRoom}
        messages={messages}
      />
    </div>
  );
}

export default MessageButton;

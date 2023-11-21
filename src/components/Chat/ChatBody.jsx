import { Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MessageLeft, MessageRight } from './Message';
import { TextInput } from './TextInput';
import { updateIsRead } from './updateIsRead';
import { setDataFromSocket } from './setDataFromSocket';
import { fetchMessages } from './fetchMessages';
import './ChatRoom.css';
import { messagesPositionSetter } from './messagesPositionSetter';

const socketConn = io(import.meta.env.VITE_API_BASE_URL);

export function ChatBody({
  setMessages,
  messages = [],
  searchParams,
  page,
  totalData,
}) {
  const userSelector = useSelector((state) => state.authUser);
  const orderId = searchParams.get('orderId');
  const warehouseId = searchParams.get('warehouseId');
  const dispatch = useDispatch();
  const endChatRoom = useRef(null);
  const scrollToBottom = () => endChatRoom.current.scrollIntoView();
  console.log(messages.length);
  const handleNext = () => {
    page.current += 1;
    fetchMessages(
      userSelector?.id,
      searchParams,
      setMessages,
      page?.current,
      totalData
    );
  };

  const dummy = useRef(20);

  useEffect(() => {
    socketConn.connect();
    if (window.location.pathname.split('/')[1] === 'admin')
      socketConn.on(`channel-WHID-${warehouseId}-${orderId}`, ({ record }) =>
        setDataFromSocket(dispatch, searchParams, record, setMessages, messages)
      );
    socketConn.on(`channel-USER-${userSelector?.id}-${orderId}`, ({ record }) =>
      setDataFromSocket(dispatch, searchParams, record, setMessages, messages)
    );
  }, [searchParams, userSelector]);

  useEffect(() => {
    if (userSelector?.id)
      updateIsRead(setMessages, dispatch, messages, userSelector?.id);
  }, [userSelector, messages]);

  useEffect(() => {
    scrollToBottom();
  }, []);
  return (
    <Paper className="paper">
      <Typography variant="h6" pl={2}>
        {orderId === 'null'
          ? 'Write message to our staff'
          : `Chat room for order-(${orderId})`}
      </Typography>
      <Paper id="style-1" className="messagesBody">
        {messages.length ? null : <div>Start writting your message</div>}
        <InfiniteScroll
          dataLength={20}
          next={handleNext}
          className="d-flex flex-column-reverse"
          style={{ maxHeight: '50vh' }}
          // inverse
          hasMore
          loader={<h4>Loading...</h4>}
          scrollableTarget="messagesBody"
        >
          {messages.map((msg) => messagesPositionSetter(msg, userSelector))}
          <div ref={endChatRoom} />
        </InfiniteScroll>
      </Paper>
      <TextInput
        searchParams={searchParams}
        setMessages={setMessages}
        messages={messages}
      />
    </Paper>
  );
}

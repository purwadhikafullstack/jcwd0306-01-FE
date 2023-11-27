import { Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TextInput } from './TextInput';
import { updateIsRead } from './updateIsRead';
import { setDataFromSocket } from './setDataFromSocket';
import './ChatRoom.css';
import { messagesPositionSetter } from './messagesPositionSetter';
import { fetchMessages } from './fetchMessages';

const socketConn = io(import.meta.env.VITE_API_BASE_URL);

export function ChatBody({
  setMessages,
  messages = [],
  searchParams,
  page,
  totalData,
  setDisableButton,
  disableButton,
}) {
  const userSelector = useSelector((state) => state.authUser);
  const orderId = searchParams.get('orderId');
  const warehouseId = searchParams.get('warehouseId');
  const dispatch = useDispatch();

  const handleNext = () => {
    // eslint-disable-next-line no-param-reassign
    page.current += 1;
    fetchMessages(
      userSelector?.id,
      searchParams,
      setMessages,
      page?.current,
      totalData,
      setDisableButton
    );
  };

  useEffect(() => {
    socketConn.connect();
    if (window.location.pathname.split('/')[1] === 'admin')
      socketConn.on(`channel-WHID-${warehouseId}`, ({ record }) =>
        setDataFromSocket(dispatch, searchParams, record, setMessages, messages)
      );
    else
      socketConn.on(`channel-USER-${userSelector?.id}`, ({ record }) =>
        setDataFromSocket(dispatch, searchParams, record, setMessages, messages)
      );
    return () => socketConn.disconnect();
  }, [searchParams, userSelector, messages.length]);

  useEffect(() => {
    if (userSelector?.id)
      updateIsRead(setMessages, dispatch, messages, userSelector);
  });

  return (
    <Paper className="paper">
      <Typography variant="h6" pl={2}>
        {orderId === 'null'
          ? 'Write message to our staff'
          : `Chat room for order-(${orderId})`}
      </Typography>
      <Paper
        id="scrollableDiv"
        className="messagesBody"
        sx={{
          height: '52vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        {messages.length ? null : <div>Start writting your message</div>}
        <InfiniteScroll
          dataLength={messages.length}
          next={handleNext}
          id="hiddenScrollBar"
          className="d-flex flex-column-reverse"
          inverse
          hasMore={totalData.current > messages.length}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {messages.map((msg) => messagesPositionSetter(msg, userSelector))}
        </InfiniteScroll>
      </Paper>
      <TextInput
        searchParams={searchParams}
        setMessages={setMessages}
        messages={messages}
        setDisableButton={setDisableButton}
        disableButton={disableButton}
      />
    </Paper>
  );
}

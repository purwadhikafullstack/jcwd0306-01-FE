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
  const scrollToBottom = () => {
    endChatRoom.current.scrollIntoView({ behaviour: 'smooth' });
  };

  const handleNext = () => {
    console.log(page.current);
    page.current += 1;
    fetchMessages(
      userSelector?.id,
      searchParams,
      setMessages,
      page?.current,
      totalData
    );
    console.log(page.current);
  };

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
        {messages.length ? null : (
          <div>Start writting your message to admin</div>
        )}
        <InfiniteScroll
          dataLength={messages.length}
          next={handleNext}
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            maxHeight: '50vh',
          }} // To put endMessage and loader to the top.
          inverse
          hasMore
          loader={<h4>Loading...</h4>}
          scrollableTarget="messagesBody"
        >
          {messages.map((msg) => {
            if (
              msg?.receiverId === userSelector?.id &&
              msg?.senderId !== msg?.receiverId
            )
              return (
                <MessageLeft
                  key={msg?.id}
                  message={msg?.message}
                  timestamp={msg?.createdAt}
                  displayName="Admin"
                  avatarDisp
                />
              );
            if (
              msg?.senderId === userSelector?.id &&
              !msg?.receiverId &&
              window.location.pathname.split(`/`)[1] === `admin`
            )
              return (
                <MessageLeft
                  key={msg?.id}
                  message={msg?.message}
                  timestamp={msg?.createdAt}
                  displayName={msg?.Sender?.firstName}
                  avatarDisp
                />
              );
            if (msg?.senderId === userSelector?.id && !msg?.receiverId)
              return (
                <MessageRight
                  key={msg?.id}
                  message={msg?.message}
                  timestamp={msg?.createdAt}
                  displayName="テスト"
                  avatarDisp
                />
              );
            if (
              msg?.senderId === userSelector?.id &&
              msg?.receiverId &&
              window.location.pathname.split(`/`)[1] === `admin`
            )
              return (
                <MessageRight
                  key={msg?.id}
                  message={msg?.message}
                  timestamp={msg?.createdAt}
                  displayName="テスト"
                  avatarDisp
                />
              );
            if (
              msg?.senderId === userSelector?.id &&
              msg?.receiverId === userSelector?.id &&
              window.location.pathname.split(`/`)[1] !== `admin`
            )
              return (
                <MessageLeft
                  key={msg?.id}
                  message={msg?.message}
                  timestamp={msg?.createdAt}
                  displayName={msg?.Sender?.firstName}
                  avatarDisp
                />
              );
            return (
              <MessageLeft
                key={msg?.id}
                message={msg?.message}
                timestamp={msg?.createdAt}
                displayName={msg?.Sender?.firstName}
                avatarDisp
              />
            );
          })}
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

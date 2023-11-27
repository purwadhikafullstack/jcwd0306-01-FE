import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import './ChatRoom.css';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { io } from 'socket.io-client';
import { ChatBody } from './ChatBody';
import { ChatRoomCardButton } from './ChatRoomCardButton';
import { fetchMessages } from './fetchMessages';
import { fetchChatRooms } from './fetchChatRooms';
import { socketListenerCardButton } from '../admin/ChatPage/socketListenerCardButton';
import { isRoomDisplayed } from './IsRoomDisplayed';

const socketConn = io(import.meta.env.VITE_API_BASE_URL);

export function ChatRoom() {
  const userSelector = useSelector((state) => state.authUser);
  const [searchParams, setSearchParams] = useSearchParams();
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const totalData = useRef(0);
  const page = useRef(1);
  const theme = useTheme();
  const smallerScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    isRoomDisplayed(searchParams, chatRooms, setChatRooms);
    socketConn.connect();
    if (userSelector?.id)
      socketListenerCardButton(
        socketConn,
        setChatRooms,
        searchParams,
        null,
        userSelector?.id
      );
    if (userSelector?.id && searchParams.get(`orderId`)) {
      fetchMessages(
        userSelector.id,
        searchParams,
        setMessages,
        page?.current,
        totalData,
        setDisableButton
      );
    }
    if (searchParams.get(`orderId`)) setShowInput(true);
  }, [searchParams, userSelector]);

  useEffect(() => {
    if (userSelector?.id) fetchChatRooms(userSelector?.id, setChatRooms);
  }, [userSelector]);
  return (
    <div className="container" style={{ padding: '0' }}>
      <Typography variant="h5">Write message to our staff</Typography>
      <Grid container spacing={1} mt={1}>
        <Grid
          item
          md={3}
          xs={12}
          sx={{
            display:
              smallerScreen && searchParams.get(`orderId`) ? 'none' : 'block',
          }}
        >
          <Stack gap={1}>
            <Card
              className={
                searchParams.get('orderId') === 'null'
                  ? 'bg-info-subtle'
                  : 'transparent'
              }
            >
              <Button
                className="d-flex w-100"
                disabled={disableButton}
                onClick={() => {
                  setShowInput(true);
                  page.current = 1;
                  setSearchParams((params) => {
                    params.set('orderId', null);
                    params.delete(`warehouseId`);
                    return params;
                  });
                  fetchMessages(
                    userSelector.id,
                    searchParams,
                    setMessages,
                    page.current
                  );
                }}
              >
                <CardContent className="p-2">Customer support</CardContent>
              </Button>
            </Card>
            {chatRooms.length
              ? chatRooms.map((room) => (
                  <ChatRoomCardButton
                    key={room.id}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    room={room}
                    page={page}
                    disableButton={disableButton}
                  />
                ))
              : null}
          </Stack>
        </Grid>
        <Grid
          item
          md={9}
          xs={12}
          sx={{
            display:
              smallerScreen && !searchParams.get(`orderId`) ? 'none' : 'block',
            position: 'relative',
          }}
        >
          <Button
            onClick={() => {
              setShowInput(false);
              setSearchParams((params) => {
                params.delete('orderId');
                params.delete(`warehouseId`);
                return params;
              });
            }}
          >
            <ArrowBack />
            Back
          </Button>
          {messages.length || showInput ? (
            <ChatBody
              messages={messages}
              setMessages={setMessages}
              searchParams={searchParams}
              page={page}
              totalData={totalData}
              setDisableButton={setDisableButton}
              disableButton={disableButton}
            />
          ) : (
            <Paper className="paper" sx={{ minHeight: '55vh' }}>
              <CardContent>
                <Typography variant="h6">
                  Contact admin to discuss your order
                </Typography>
              </CardContent>
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

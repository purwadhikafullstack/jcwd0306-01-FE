import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import './ChatRoom.css';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ChatBody } from './ChatBody';
import { ChatRoomCardButton } from './ChatRoomCardButton';
import { fetchMessages } from './fetchMessages';
import { fetchChatRooms } from './fetchChatRooms';

export function ChatRoom() {
  const userSelector = useSelector((state) => state.authUser);
  const [searchParams, setSearchParams] = useSearchParams();
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (userSelector?.id)
      fetchMessages(userSelector.id, searchParams, setMessages);
    if (searchParams.get(`orderId`)) setShowInput(true);
  }, [searchParams]);

  useEffect(() => {
    if (userSelector?.id) fetchChatRooms(userSelector?.id, setChatRooms);
  }, [userSelector]);
  return (
    <div className="container" style={{ padding: '0' }}>
      <Typography variant="h5">Write message to our staff</Typography>
      <Grid container spacing={1} mt={1}>
        <Grid item md={3}>
          <Stack gap={1}>
            <Card>
              <Button
                className="d-flex w-100"
                onClick={() => {
                  setShowInput(true);
                  setSearchParams((params) => {
                    params.delete('orderId');
                    params.delete(`warehouseId`);
                    return params;
                  });
                  fetchMessages(userSelector.id, searchParams, setMessages);
                }}
              >
                <CardContent className="p-2">Customer support</CardContent>
              </Button>
            </Card>
            {chatRooms.length
              ? chatRooms.map((room) => (
                  <ChatRoomCardButton
                    key={room.id}
                    setSearchParams={setSearchParams}
                    room={room}
                  />
                ))
              : null}
          </Stack>
        </Grid>
        <Grid item md={9} xs={12}>
          {messages.length || showInput ? (
            <ChatBody
              messages={messages}
              setMessages={setMessages}
              searchParams={searchParams}
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

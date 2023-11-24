import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { io } from 'socket.io-client';
import { warehouseIdSetter } from '../../components/admin/TransactionPage/warehouseIdSetter';
import { ChatRoomCardButton } from '../../components/Chat/ChatRoomCardButton';
import { fetchRooms } from '../../components/admin/ChatPage/fetchRooms';
import { fetchMessages } from '../../components/Chat/fetchMessages';
import { ChatBody } from '../../components/Chat/ChatBody';
import { socketListenerCardButton } from '../../components/admin/ChatPage/socketListenerCardButton';

const socketConn = io(import.meta.env.VITE_API_BASE_URL);

export function ChatPage({ warehouseId = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [whId, setWhId] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const receiverId = searchParams.get('receiverId');
  const page = useRef(1);
  const totalData = useRef(0);
  const theme = useTheme();
  const smallerScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    warehouseIdSetter(setWhId, warehouseId);
  }, [warehouseId]);

  useEffect(() => {
    fetchMessages(
      receiverId,
      searchParams,
      setMessages,
      page.current,
      totalData
    );
  }, [searchParams]);

  useEffect(() => {
    socketConn.connect();
    socketListenerCardButton(socketConn, setRooms, searchParams, whId);
    if (whId.length) fetchRooms(whId, setRooms);
  }, [whId]);
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" pb={2}>
            Messages
          </Typography>
          <Grid container spacing={1}>
            <Grid
              item
              md={3}
              xs={12}
              sx={{
                display:
                  smallerScreen && searchParams.get(`orderId`)
                    ? 'none'
                    : 'block',
              }}
            >
              <Card
                sx={{
                  minHeight: '74vh',
                  maxHeight: '74vh',
                  overflowY: 'scroll',
                }}
              >
                <CardContent>
                  <Stack gap={1}>
                    {rooms.length
                      ? rooms.map((room) => (
                          <ChatRoomCardButton
                            key={room?.id}
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                            room={room}
                            page={page}
                            setMessages={setMessages}
                            whId={whId}
                            disableButton={disableButton}
                          />
                        ))
                      : 'You have no chat room'}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              md={9}
              xs={12}
              sx={{
                display:
                  smallerScreen && !searchParams.get(`orderId`)
                    ? 'none'
                    : 'block',
                position: 'relative',
              }}
            >
              <Card>
                <CardContent>
                  <Button
                    disabled={disableButton}
                    onClick={() => {
                      setShowInput(false);
                      setSearchParams((params) => {
                        params.delete('receiverId');
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
                          Find some one in transaction list
                        </Typography>
                      </CardContent>
                    </Paper>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { warehouseIdSetter } from '../../components/admin/TransactionPage/warehouseIdSetter';
import { ChatRoomCardButton } from '../../components/Chat/ChatRoomCardButton';
import { fetchRooms } from '../../components/admin/ChatPage/fetchRooms';
import { fetchMessages } from '../../components/Chat/fetchMessages';
import { ChatBody } from '../../components/Chat/ChatBody';

export function ChatPage({ warehouseId = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [whId, setWhId] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const receiverId = searchParams.get('receiverId');
  const page = useRef(1);
  const totalData = useRef(0);
  const userSelector = useSelector((state) => state.authUser);

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
    if (whId.length) fetchRooms(whId, setRooms);
  }, [whId]);
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" pb={2}>
            Messages
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={3}>
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
                          />
                        ))
                      : null}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={9}>
              <Card>
                <CardContent>
                  <Button
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

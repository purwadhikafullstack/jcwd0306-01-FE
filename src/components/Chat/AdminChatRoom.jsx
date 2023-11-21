import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatBody } from './ChatBody';
import api from '../../constants/api';
import { updateIsRead } from './updateIsRead';

export function AdminChatRoom({ chatAttrAdmin, setChatAttrAdmin }) {
  const [messages, setMessages] = useState([]);
  const theme = useTheme();
  const totalData = useRef(0);
  const userSelector = useSelector((state) => state.authUser);
  const receiverId = chatAttrAdmin.get('receiverId');
  const orderId = chatAttrAdmin.get('orderId');
  const dispatch = useDispatch();
  const page = useRef(1);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () =>
    setChatAttrAdmin(
      new Map([
        [`receiverId`, 0],
        [`orderId`, 0],
        [`warehouseId`, 0],
      ])
    );
  const fetchMessages = async () => {
    if (!orderId && !receiverId) return;
    const { data } = await api.get(
      `/chat/${receiverId}/${orderId}?page=${page.current}`
    );
    setMessages((msg) => [...msg, ...data.rows]);
    updateIsRead(setMessages, dispatch, messages, userSelector?.id);
  };

  useEffect(() => {
    page.current = 1;
    fetchMessages();
  }, [chatAttrAdmin]);

  return (
    <Dialog
      onClose={handleClose}
      fullWidth
      fullScreen={fullScreen}
      open={Boolean(chatAttrAdmin.get('receiverId'))}
    >
      <DialogTitle>(name here)</DialogTitle>
      <DialogContent>
        <ChatBody
          messages={messages}
          page={page}
          setMessages={setMessages}
          searchParams={chatAttrAdmin}
          fetchMessages={fetchMessages}
          totalData={totalData}
        />
      </DialogContent>
    </Dialog>
  );
}

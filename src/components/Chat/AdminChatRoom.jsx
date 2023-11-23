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
import { updateIsRead } from './updateIsRead';
import { fetchMessages } from './fetchMessages';

export function AdminChatRoom({ chatAttrAdmin, setChatAttrAdmin }) {
  const [messages, setMessages] = useState([]);
  const theme = useTheme();
  const totalData = useRef(0);
  const userSelector = useSelector((state) => state.authUser);
  const receiverId = chatAttrAdmin.get('receiverId');
  const userName = chatAttrAdmin.get('name');
  const dispatch = useDispatch();
  const page = useRef(1);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () =>
    setChatAttrAdmin(
      new Map([
        [`receiverId`, 0],
        [`orderId`, 0],
        [`warehouseId`, 0],
        ['name', ''],
      ])
    );

  useEffect(() => {
    page.current = 1;
    fetchMessages(
      receiverId,
      chatAttrAdmin,
      setMessages,
      page.current,
      totalData
    );
  }, [chatAttrAdmin]);

  useEffect(() => {
    updateIsRead(setMessages, dispatch, messages, userSelector?.id);
  }, [userSelector, messages]);

  return (
    <Dialog
      onClose={handleClose}
      fullWidth
      fullScreen={fullScreen}
      open={Boolean(chatAttrAdmin.get('receiverId'))}
    >
      <DialogTitle>To: {userName}</DialogTitle>
      <DialogContent>
        <ChatBody
          messages={messages}
          page={page}
          setMessages={setMessages}
          searchParams={chatAttrAdmin}
          totalData={totalData}
        />
      </DialogContent>
    </Dialog>
  );
}

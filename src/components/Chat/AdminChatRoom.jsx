import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { ChatBody } from './ChatBody';

export function AdminChatRoom({ chatAttrAdmin, setChatAttrAdmin }) {
  const [messages, setMessages] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () =>
    setChatAttrAdmin(
      new Map([
        [`receiverId`, 0],
        [`orderId`, 0],
        [`warehouseId`, 0],
      ])
    );
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
          setMessages={setMessages}
          searchParams={chatAttrAdmin}
        />
      </DialogContent>
    </Dialog>
  );
}

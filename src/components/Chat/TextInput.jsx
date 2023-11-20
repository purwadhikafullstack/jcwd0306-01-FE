import { Button, TextField } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import api from '../../constants/api';
import { constant } from '../../constants/constant';

export function TextInput({ searchParams, messages, setMessages }) {
  const userSelector = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const [disableButton, setDisableButton] = useState(false);
  const handlePostMessage = async () => {
    try {
      const message = document.getElementById('standard-text').value;
      if (!message) return;
      if (message.length > 255)
        throw new Error(`Text exceeds 255 characters (${message.length})`);
      setDisableButton(true);
      const { data } = await api.post(`/chat/${userSelector?.id}`, {
        senderId: userSelector?.id,
        warehouseId: searchParams.get('warehouseId'),
        orderId: searchParams.get('orderId'),
        ...(searchParams.get(`receiverId`) && {
          receiverId: searchParams.get(`receiverId`),
        }),
        message,
      });
      const rec = messages.find((val) => val.id === data.id);
      if (rec) return;
      setMessages([data, ...messages]);
      document.getElementById('standard-text').value = '';
    } catch (error) {
      dispatch(constant.setError(error));
    } finally {
      setDisableButton(false);
    }
  };
  return (
    <form
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: `0 auto`,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-text"
        label="Write your message"
        className="w-100"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handlePostMessage();
            e.preventDefault();
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePostMessage}
        disabled={disableButton}
      >
        <SendRoundedIcon />
      </Button>
    </form>
  );
}

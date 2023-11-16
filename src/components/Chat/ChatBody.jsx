import { Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { MessageLeft, MessageRight } from './Message';
import { TextInput } from './TextInput';

export function ChatBody({ setMessages, messages = [], searchParams }) {
  const userSelector = useSelector((state) => state.authUser);
  return (
    <Paper className="paper">
      <Typography variant="h6">
        Chat room for order-({searchParams.get('orderId')})
      </Typography>
      <Paper id="style-1" className="messagesBody" sx={{ minHeight: '50vh' }}>
        {messages.length ? null : (
          <div>Start writting your message to admin</div>
        )}
        {messages.map((msg) => {
          if (msg.receiverId === userSelector?.id)
            return (
              <MessageLeft
                key={msg.id}
                message={msg.message}
                timestamp={msg.createdAt}
                displayName="Admin"
                avatarDisp
              />
            );
          if (msg.senderId === userSelector?.id)
            return (
              <MessageRight
                key={msg.id}
                message={msg.message}
                timestamp={msg.createdAt}
                displayName="テスト"
                avatarDisp
              />
            );
        })}
      </Paper>
      <TextInput
        searchParams={searchParams}
        setMessages={setMessages}
        messages={messages}
      />
    </Paper>
  );
}

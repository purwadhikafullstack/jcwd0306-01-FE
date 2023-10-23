import { ChatOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

function ChatButton() {
  return (
    <Button
      fullWidth
      size="small"
      color="text"
      startIcon={<ChatOutlined />}
      sx={{ textTransform: 'none' }}
    >
      Chat
    </Button>
  );
}

export default ChatButton;

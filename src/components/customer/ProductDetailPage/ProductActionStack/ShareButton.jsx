import { ShareOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

function ShareButton() {
  return (
    <Button
      fullWidth
      size="small"
      color="text"
      startIcon={<ShareOutlined />}
      sx={{ textTransform: 'none' }}
    >
      Share
    </Button>
  );
}

export default ShareButton;

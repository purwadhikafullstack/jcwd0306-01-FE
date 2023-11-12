import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const nav = useNavigate();
  return (
    <Button
      variant="outlined"
      sx={{ textTransform: 'none', textDecoration: 'none' }}
      onClick={() => nav('/login')}
    >
      Masuk
    </Button>
  );
}

export default LoginButton;

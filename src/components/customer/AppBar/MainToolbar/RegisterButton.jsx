import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RegisterButton() {
  const nav = useNavigate();
  return (
    <Button
      variant="contained"
      sx={{ textTransform: 'none' }}
      onClick={() => nav('/register')}
    >
      Daftar
    </Button>
  );
}

export default RegisterButton;

import { Button, Link } from '@mui/material';

const apiUrl = import.meta.env.VITE_FE_BASE_URL;

function LoginButton() {
  return (
    <Button
      variant="outlined"
      sx={{ textTransform: 'none', textDecoration: 'none' }}
    >
      <Link
        href={`${apiUrl}/login`}
        sx={{ textTransform: 'none', textDecoration: 'none' }}
      >
        Masuk
      </Link>
    </Button>
  );
}

export default LoginButton;

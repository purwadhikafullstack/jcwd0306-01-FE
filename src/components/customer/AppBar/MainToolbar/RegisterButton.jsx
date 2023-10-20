import { Button, Link } from '@mui/material';

const apiUrl = import.meta.env.VITE_FE_BASE_URL;

function RegisterButton() {
  return (
    <Button variant="contained" sx={{ textTransform: 'none' }}>
      <Link
        href={`${apiUrl}/register`}
        sx={{ textTransform: 'none', textDecoration: 'none', color: 'inherit' }}
        variant="contained"
      >
        Daftar
      </Link>
    </Button>
  );
}

export default RegisterButton;

import { ArrowBack } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Stack, Typography } from '@mui/material';

export function BackToHome() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname.split('/')[1];

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBack />
      </IconButton>
      <Typography color="text.primary" fontWeight={600}>
        {pathName.toUpperCase()}
      </Typography>
    </Stack>
  );
}

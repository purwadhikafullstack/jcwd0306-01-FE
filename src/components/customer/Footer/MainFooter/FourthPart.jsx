import { Stack, Typography } from '@mui/material';

function FourthPart() {
  return (
    <Stack spacing={5}>
      <Stack spacing={2}>
        <Typography variant="caption" fontWeight="bold">
          Jasa Pengiriman
        </Typography>
        <Typography variant="caption">Pos Indonesia | JNE | J&T</Typography>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="caption" fontWeight="bold">
          Download Aplikasi Gadget Gallery
        </Typography>
        <Typography variant="caption">Coming Soon</Typography>
      </Stack>
    </Stack>
  );
}

export default FourthPart;

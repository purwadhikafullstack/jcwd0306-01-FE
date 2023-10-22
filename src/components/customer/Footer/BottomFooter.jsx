import { Stack, Typography } from '@mui/material';

function BottomFooter() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ py: '0.2rem', borderTop: 'solid 0.05rem grey' }}
    >
      <Typography variant="caption">
        Made with 💙 by Panji, Enos, Nazhif
      </Typography>
    </Stack>
  );
}

export default BottomFooter;

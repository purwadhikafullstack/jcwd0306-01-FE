import { PlaceOutlined } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

function ProductShipmentStack() {
  return (
    <Stack spacing={2}>
      <Typography fontWeight={600}>Pengiriman</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <PlaceOutlined color="primary" />
        <Typography variant="body2" component="span">
          Dikirim dari
        </Typography>
        <Typography variant="body2" fontWeight={600} component="span">
          Jakarta Pusat
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ProductShipmentStack;

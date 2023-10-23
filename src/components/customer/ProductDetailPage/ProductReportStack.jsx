import { WarningAmberOutlined } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

function ProductReportStack() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="caption">Ada masalah dengan produk ini?</Typography>
      <Button
        color="text"
        size="small"
        variant="outlined"
        startIcon={<WarningAmberOutlined />}
        sx={{ textTransform: 'none' }}
      >
        Laporkan
      </Button>
    </Stack>
  );
}

export default ProductReportStack;

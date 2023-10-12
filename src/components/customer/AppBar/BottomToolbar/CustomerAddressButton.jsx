import { ExpandMoreOutlined, PlaceOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

function CustomerAddressButton() {
  return (
    <Button
      color="text"
      size="small"
      startIcon={<PlaceOutlined />}
      endIcon={<ExpandMoreOutlined />}
      sx={{
        textTransform: 'none',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>
        Dikirim ke
      </Box>
      <Box component="span">Jakarta Pusat</Box>
    </Button>
  );
}

export default CustomerAddressButton;

import { ExpandMoreOutlined, PlaceOutlined } from '@mui/icons-material';
import { Box, Button, useTheme } from '@mui/material';
import checkLocationPathName from '../checkLocationPathName';

function CustomerAddressButton() {
  const isCartPage = checkLocationPathName();
  const theme = useTheme();
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
        [theme.breakpoints.down('sm')]: {
          display: isCartPage ? `none` : `flex`,
        },
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

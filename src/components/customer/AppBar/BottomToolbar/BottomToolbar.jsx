import { Box, Toolbar } from '@mui/material';
import CustomerAddressButton from './CustomerAddressButton';

function BottomToolbar() {
  return (
    <Toolbar variant="dense" sx={{ minHeight: 'fit-content' }}>
      <Box sx={{ flexGrow: 1 }} />
      <CustomerAddressButton />
    </Toolbar>
  );
}

export default BottomToolbar;

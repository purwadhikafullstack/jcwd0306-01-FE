import { Box, Toolbar } from '@mui/material';
import CustomerAddressButton from './CustomerAddressButton';
import { BackToHome } from './BackToHome';

function BottomToolbar() {
  return (
    <Toolbar variant="dense" sx={{ minHeight: 'fit-content' }}>
      <BackToHome />
      <Box sx={{ flexGrow: 1 }} />
      <CustomerAddressButton />
    </Toolbar>
  );
}

export default BottomToolbar;

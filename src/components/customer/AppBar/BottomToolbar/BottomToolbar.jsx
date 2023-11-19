import { Box, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import CustomerAddressButton from './CustomerAddressButton';
import { BackToHome } from './BackToHome';

function BottomToolbar() {
  const authUser = useSelector((states) => states.authUser);

  if (authUser === null) return null;

  return (
    <Toolbar variant="dense" sx={{ minHeight: 'fit-content' }}>
      <BackToHome />
      <Box sx={{ flexGrow: 1 }} />
      <CustomerAddressButton />
    </Toolbar>
  );
}

export default BottomToolbar;

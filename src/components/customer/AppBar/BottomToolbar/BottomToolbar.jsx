import { Box, Toolbar } from '@mui/material';
import { useEffect } from 'react';
import CustomerAddressButton from './CustomerAddressButton';
import { BackToHome } from './BackToHome';

function BottomToolbar() {
  const isUserLogin = localStorage.getItem('token');

  useEffect(() => {
    localStorage.getItem('token');
  }, []);

  return (
    <Toolbar variant="dense" sx={{ minHeight: 'fit-content' }}>
      <BackToHome />
      <Box sx={{ flexGrow: 1 }} />
      <CustomerAddressButton />
      <Box sx={{ display: isUserLogin ? 'none' : 'block' }}> \ </Box>
    </Toolbar>
  );
}

export default BottomToolbar;

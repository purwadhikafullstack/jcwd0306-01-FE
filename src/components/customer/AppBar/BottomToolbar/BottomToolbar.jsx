import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import CustomerAddressButton from './CustomerAddressButton';
import { BackToHome } from './BackToHome';
import useIsPathName from '../../../../hooks/useIsPathName';

function BottomToolbar() {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isCartPage = useIsPathName('cart');

  const isUserLogin = localStorage.getItem('token');

  useEffect(() => {
    localStorage.getItem('token');
  }, []);

  return (
    <Toolbar variant="dense" sx={{ minHeight: 'fit-content' }}>
      {isSmDown && isCartPage && <BackToHome />}
      <Box sx={{ flexGrow: 1 }} />
      {!(isCartPage && isSmDown) && <CustomerAddressButton />}
    </Toolbar>
  );
}

export default BottomToolbar;

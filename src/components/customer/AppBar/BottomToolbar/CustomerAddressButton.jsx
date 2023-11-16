import { ExpandMoreOutlined, PlaceOutlined } from '@mui/icons-material';
import { Box, Button, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import checkLocationPathName from '../checkLocationPathName';
import defaultAddressParameter from '../../../../utils/defaultAddressParameter';
import { asyncGetAddress } from '../../../../states/Address/action';

function CustomerAddressButton() {
  const authUser = useSelector((state) => state.authUser);
  const globalAddress = useSelector((states) => states.userAddress);
  const isCartPage = checkLocationPathName();
  const theme = useTheme();
  const dispatch = useDispatch();
  const mainAddress = globalAddress.find(defaultAddressParameter);
  // kalo gaada main addressnya, kirim ke alamat paling pertama dari table, kalo gaada kasih tulisan (tambah alamat)
  const firstAddress = globalAddress[0]?.City?.name;
  const isUserLogin = localStorage.getItem('token');

  let display;

  if (mainAddress) {
    display = mainAddress?.City.name || '';
  } else if (firstAddress) {
    display = firstAddress || '';
  } else {
    display = '-';
  }

  useEffect(() => {
    if (authUser?.id) dispatch(asyncGetAddress({ userId: authUser?.id }));
  }, [authUser?.id]);

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
        display: isUserLogin ? 'flex' : 'none',
        [theme.breakpoints.down('sm')]: {
          display: isCartPage ? `none` : `flex`,
        },
      }}
    >
      <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>
        Dikirim ke
      </Box>
      <Box component="span">{display}</Box>
    </Button>
  );
}

export default CustomerAddressButton;

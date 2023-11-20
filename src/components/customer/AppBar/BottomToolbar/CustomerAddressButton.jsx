import { ExpandMoreOutlined, PlaceOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { asyncGetAddress } from '../../../../states/Address/action';

function CustomerAddressButton() {
  const authUser = useSelector((state) => state.authUser);
  const userAddress = useSelector((states) => states.userAddress);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const display = useMemo(() => {
    const mainAddress = userAddress.find((val) => val.isDefault);
    // kalo gaada main addressnya, kirim ke alamat paling pertama dari table
    const firstAddress = userAddress[0]?.City?.name;

    if (mainAddress) return mainAddress?.City.name || '';
    if (firstAddress) return firstAddress || '';
    return '-';
  }, [userAddress]);

  useEffect(() => {
    dispatch(asyncGetAddress(authUser?.id));
  }, [authUser?.id]);

  return (
    <Button
      onClick={() => navigate('/user/address')}
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
      <Box component="span">{display}</Box>
    </Button>
  );
}

export default CustomerAddressButton;

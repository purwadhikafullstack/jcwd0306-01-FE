import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import { SearchAddress } from './SearchInput';
import { ModalEditAndAddAddress } from '../Checkout/ModalEditAndAddAddress';
import api from '../../../constants/api';
import { setAlertActionCreator } from '../../../states/alert/action';
import { asyncGetAddress } from '../../../states/Address/action';

function Container() {
  const authUser = useSelector((states) => states.authUser);
  const globalAddress = useSelector((state) => state.userAddress);
  const isDesktop = useMediaQuery('(min-width:600px)');
  const [showModal, setShowModal] = useState('');
  const [addresses, setAddresses] = useState([]);
  // console.log({ globalAddress, addresses });

  const dispatch = useDispatch();
  const addressSelector = useSelector((state) => state.selectedAddress);
  const defaultAddress = globalAddress.find((address) => address.isDefault);
  // console.log(defaultAddress);
  const [address, setAddress] = useState({});
  const [addressToEdit, setAddressToEdit] = useState({});
  const [isDefaultUpdated, setIsDefaultUpdated] = useState(false);

  const [chosenAddress, setChoosenAddress] = useState(defaultAddress || null);

  const fetchAddress = async () => {
    try {
      const res = await api.get(`/user_address/${authUser?.id}`);

      const temp = res?.data?.rows;
      setAddresses(temp);
      setIsDefaultUpdated(!isDefaultUpdated);
    } catch (error) {
      console.log(error);
      dispatch(
        setAlertActionCreator({
          val: { status: 'error', message: error?.response.data.message },
        })
      );
    }
  };

  useEffect(() => {
    if (authUser && authUser.id) {
      fetchAddress();
      dispatch(asyncGetAddress(authUser?.id));
    }
  }, [authUser]);

  useEffect(() => {
    if (addressSelector?.id) {
      setAddress(addressSelector);
    } else {
      setAddress(defaultAddress);
      setChoosenAddress(defaultAddress || null);
    }
  }, [defaultAddress?.id, addressSelector]);

  return (
    <Stack
      sx={{
        p: 1,
        bgcolor: 'Background.paper',
        borderRadius: 1,
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          {/* Title */}
          <Typography
            fontWeight={800}
            fontSize={isDesktop ? '1.2rem' : '1rem'}
            display="flex"
            alignItems="center"
          >
            Address
          </Typography>

          {/* Search Bar */}
          <SearchAddress isDesktop={isDesktop} />

          {/* Add Address Button */}
          <Button
            variant="contained"
            sx={{ textTransform: 'none' }}
            onClick={() => setShowModal('ADD ADDRESS')}
          >
            <AddRounded />
            {isDesktop ? 'Address' : ' '}
          </Button>
          {/* Dialog Add Address */}
        </Stack>

        {/* Address List */}
        <AddressList
          addresses={globalAddress}
          setOpen={setShowModal}
          setAddressToEdit={setAddressToEdit} // new
          isDefaultUpdated={isDefaultUpdated}
          setChoosenAddress={setChoosenAddress}
          chosenAddress={chosenAddress}
        />
      </Stack>
      {/* modal edit and add */}
      <ModalEditAndAddAddress
        open={showModal}
        setOpen={setShowModal}
        addresses={globalAddress}
        addressToEdit={addressToEdit}
        setAddress={setAddress}
        setAddresses={setAddresses}
        setAddressToEdit={setAddressToEdit}
      />
    </Stack>
  );
}

export default Container;

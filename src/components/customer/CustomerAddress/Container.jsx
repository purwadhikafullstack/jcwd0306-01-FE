import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import { SearchAddress } from './SearchInput';
import { ModalEditAndAddAddress } from '../Checkout/ModalEditAndAddAddress';
import api from '../../../constants/api';
import { setAlertActionCreator } from '../../../states/alert/action';

function Container() {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const [showModal, setShowModal] = useState('');
  const authUser = useSelector((states) => states.authUser);
  const [addresses, setAddresses] = useState([]);
  const dispatch = useDispatch();
  const addressSelector = useSelector((state) => state.selectedAddress);
  const defaultAddress = Array.isArray(addresses)
    ? addresses.find((destination) => destination.isDefault)
    : null;
  const [address, setAddress] = useState({});
  const [addressToEdit, setAddressToEdit] = useState({});
  const [isDefaultUpdated, setIsDefaultUpdated] = useState(false);
  const [defAddress, setDefAddress] = useState(null);

  const [chosenAddress, setChoosenAddress] = useState(defaultAddress || null);

  const fetchAddress = async () => {
    try {
      const res = await api.get(`/user_address/${authUser?.id}`);
      const temp = res?.data?.rows;
      setAddresses(temp);
      setIsDefaultUpdated(!isDefaultUpdated);

      temp.map((val) => {
        const newDefault = val.isDefault;
        if (newDefault === true) {
          setDefAddress(newDefault);
        }
      });
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
          addresses={addresses}
          fetchAddress={fetchAddress}
          setOpen={setShowModal}
          setAddressToEdit={setAddressToEdit} // new
          // setIsDefaultUpdated={setIsDefaultUpdated}
          isDefaultUpdated={isDefaultUpdated}
          setChoosenAddress={setChoosenAddress}
          chosenAddress={chosenAddress}
        />
      </Stack>
      {/* modal edit and add */}
      <ModalEditAndAddAddress
        open={showModal}
        setOpen={setShowModal}
        addresses={addresses}
        addressToEdit={addressToEdit}
        setAddress={setAddress}
        setAddresses={setAddresses}
        setAddressToEdit={setAddressToEdit}
        // additional untuk page /user/address
        fetchAddress={fetchAddress}
        // setAddressesProfile={setAddressesProfile}
      />
    </Stack>
  );
}

export default Container;

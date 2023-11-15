import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import SearchInput from './SearchInput';
import { ModalEditAndAddAddress } from '../Checkout/ModalEditAndAddAddress';
import { asyncGetAddress } from '../../../states/Address/action';
import AddressFooter from './AdministratorFooter';

function Container() {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const authUser = useSelector((states) => states.authUser);
  const globalAddress = useSelector((state) => state.userAddress);

  const [showModal, setShowModal] = useState('');
  const [addressToEdit, setAddressToEdit] = useState({});

  useEffect(() => {
    if (authUser?.id) dispatch(asyncGetAddress(authUser?.id));
  }, [authUser?.id]);

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
          <SearchInput isDesktop={isDesktop} />

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
          setOpen={setShowModal}
          setAddressToEdit={setAddressToEdit} // new
        />

        {/* Footer */}
        <AddressFooter />
      </Stack>
      {/* modal edit and add */}
      <ModalEditAndAddAddress
        open={showModal}
        setOpen={setShowModal}
        addresses={globalAddress}
        addressToEdit={addressToEdit}
        setAddressToEdit={setAddressToEdit}
      />
    </Stack>
  );
}

export default Container;

import { LocationOnRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressAction from './actions/AddressCardAction';
import DrawerActionDialog from './dialogs/DrawerAddressAction';
import api from '../../../constants/api';
import { setAlertActionCreator } from '../../../states/alert/action';
import { asyncGetAddress } from '../../../states/Address/action';

function AddressItem({ address, setOpen, setAddressToEdit }) {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  /* Set Default Address */
  const setDefaultAddress = async () => {
    try {
      const result = await api.patch(
        `user_address/new_default/${authUser?.id}/${address?.id}`,
        {
          isDefault: 1,
        }
      );
      dispatch(asyncGetAddress({ userId: authUser?.id }));
      dispatch(
        setAlertActionCreator({
          val: { status: 'success', message: result?.data },
        })
      );
    } catch (error) {
      dispatch(
        setAlertActionCreator({
          val: { status: 'error', message: error?.response?.data },
        })
      );
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const deleteAddress = async () => {
    try {
      await api.delete(`/user_address/${authUser?.id}/${address?.id}`);
      dispatch(asyncGetAddress(authUser?.id));
      dispatch(
        setAlertActionCreator({
          val: {
            status: 'info',
            message: `address ${address.addressName} deleted`,
          },
        })
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (authUser && authUser?.id) {
  //     dispatch(asyncGetAddress(authUser?.id));
  //   }
  // }, [authUser, setDefaultAddress]);

  return (
    <Card
      sx={{
        width: isDesktop ? '45rem' : '19rem',
        color: 'black',
        backgroundColor:
          address.isDefault === true
            ? { backgroundColor: '#d1f4f9' }
            : { backgroundColor: 'white' },
        ':hover':
          address.isDefault === true
            ? { backgroundColor: '#d1f4f9' }
            : { backgroundColor: '#f4fcfd' },
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={12}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            {/* Address Name */}
            <Box>
              <Stack direction="column" spacing={1} maxWidth={800}>
                <Box display="flex" alignItems="center">
                  <Typography fontWeight={550} mr="1rem">
                    {address?.addressName}
                  </Typography>
                  <Typography
                    sx={{
                      backgroundColor: 'grey',
                      color: 'white',
                      p: '2px',
                      borderRadius: '4px',
                      display: address.isDefault ? 'inline-block' : 'none',
                    }}
                  >
                    Utama
                  </Typography>
                </Box>
                <Typography fontWeight={650}>
                  {address?.receiverName}
                </Typography>
                <Typography fontWeight={100}>
                  {address?.receiverPhone}
                </Typography>
              </Stack>

              {/* Full Address */}
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                color="black"
                mt={1}
                maxWidth={700}
              >
                <LocationOnRounded sx={{ fontSize: '1rem' }} />
                <Typography variant="caption">
                  {`${address?.district}, ${address?.village}, ${address?.City?.name}, ${address?.Province?.name}`}
                </Typography>
              </Stack>
            </Box>

            {/* 'Pilih' Button */}
            <Box
              sx={{
                mt: isDesktop ? '4rem' : '1rem',
                order: isDesktop ? 2 : 0,
                width: isDesktop ? 'auto' : '100%',
                height: isDesktop ? 'auto' : '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {address.isDefault ? (
                <Button
                  onClick={() => {
                    setAddressToEdit(address);
                    setOpen('EDIT ADDRESS');
                  }}
                  sx={{ display: isDesktop ? 'none' : 'inline-block' }}
                >
                  ubah alamat
                </Button>
              ) : (
                <IconButton
                  sx={{
                    display: isDesktop ? 'none' : 'block',
                  }}
                  onClick={handleDrawerOpen}
                >
                  <MoreVertOutlinedIcon
                    sx={{
                      transform: 'rotate(90deg)',
                    }}
                  />
                </IconButton>
              )}
              <DrawerActionDialog
                isOpen={isDrawerOpen}
                onClose={handleDrawerClose}
                setOpen={setOpen}
                address={address}
                setAddressToEdit={setAddressToEdit}
                deleteAddress={deleteAddress}
                setDefaultAddress={setDefaultAddress}
              />
            </Box>
          </CardContent>

          {/* Card Action */}
          <AddressAction
            isDesktop={isDesktop}
            deleteAddress={deleteAddress}
            setOpen={setOpen}
            setAddressToEdit={setAddressToEdit}
            address={address}
            setDefaultAddress={setDefaultAddress}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default AddressItem;

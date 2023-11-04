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

function AddressItem({ address, fetchAddress, setOpen, setAddressToEdit }) {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const deleteAddress = async () => {
    try {
      await api.delete(`/user_address/${authUser?.id}/${address?.id}`);
      fetchAddress();
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

  return (
    <Card
      sx={{
        width: isDesktop ? '45rem' : '19rem',
        color: 'black',
        ':hover': { backgroundColor: '#f4fcfd' },
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
                <Typography fontWeight={550}>{address?.addressName}</Typography>
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
              }}
            >
              <Button variant="contained" fullWidth={!isDesktop}>
                Pilih
              </Button>
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
              <DrawerActionDialog
                isOpen={isDrawerOpen}
                onClose={handleDrawerClose}
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
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default AddressItem;

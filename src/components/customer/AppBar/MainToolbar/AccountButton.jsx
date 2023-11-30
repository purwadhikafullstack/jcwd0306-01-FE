import { Avatar, Button, Stack, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AccountCircleRounded,
  AdminPanelSettingsRounded,
  FavoriteRounded,
  HomeRounded,
  LogoutRounded,
  ReceiptRounded,
} from '@mui/icons-material';
import { asyncUnsetAuthUser } from '../../../../states/authUser/action';

function AccountButton() {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const userImage = useSelector((state) => state.authUser.imageUrl);

  const handleClickLogout = () => {
    dispatch(asyncUnsetAuthUser());
    nav('/');
  };

  return (
    <Tooltip
      disableFocusListener
      slotProps={{
        tooltip: {
          sx: {
            p: 2,
            bgcolor: 'background.paper',
            boxShadow: 2,
          },
        },
      }}
      title={
        <Stack spacing={1}>
          {/* Admin button */}
          {(authUser.isAdmin || authUser.WarehouseUser) && (
            <Button
              onClick={() => {
                nav('/admin/dashboard');
              }}
              variant="contained"
              startIcon={<AdminPanelSettingsRounded />}
              sx={{ textTransform: 'none' }}
            >
              Admin
            </Button>
          )}

          {/* Account button */}
          <Button
            onClick={() => nav('/user/settings')}
            variant="contained"
            startIcon={<AccountCircleRounded />}
            sx={{ textTransform: 'none' }}
          >
            Akun
          </Button>

          {/* Order button */}
          <Button
            onClick={() => {
              nav('/order-list');
            }}
            variant="contained"
            startIcon={<ReceiptRounded />}
            sx={{ textTransform: 'none' }}
          >
            Transaksi
          </Button>

          {/* Wishlist button */}
          <Button
            variant="contained"
            startIcon={<FavoriteRounded />}
            sx={{ textTransform: 'none' }}
          >
            Wishlist
          </Button>

          {/* Address button */}
          <Button
            onClick={() => nav('/user/address')}
            variant="contained"
            startIcon={<HomeRounded />}
            sx={{ textTransform: 'none' }}
          >
            Alamat
          </Button>

          {/* Logout button */}
          <Button
            onClick={handleClickLogout}
            variant="contained"
            color="error"
            startIcon={<LogoutRounded />}
            sx={{ textTransform: 'none' }}
          >
            Keluar
          </Button>
        </Stack>
      }
    >
      <Button
        color="text"
        size="small"
        startIcon={
          <Avatar
            alt={authUser.firstName}
            src={
              userImage ||
              `${import.meta.env.VITE_API_BASE_URL}/user/${authUser?.id}/image`
            }
          />
        }
        sx={{ textTransform: 'none' }}
      >
        {authUser.firstName}
      </Button>
    </Tooltip>
  );
}

export default AccountButton;

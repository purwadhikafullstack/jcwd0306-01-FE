import {
  AccountCircleRounded,
  AdminPanelSettingsRounded,
  FavoriteRounded,
  HomeRounded,
  LogoutRounded,
  ReceiptRounded,
} from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bool, func } from 'prop-types';
import { asyncUnsetAuthUser } from '../../../states/authUser/action';

function MenuDialog({ isMenuDialogOpen, setIsMenuDialogOpen }) {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allMenu = useMemo(() => {
    const menu = [
      {
        label: 'Akun',
        color: 'primary',
        icon: <AccountCircleRounded />,
        onClick: () => {
          navigate('/user/settings');
          setIsMenuDialogOpen(false);
        },
      },
      {
        label: 'Transaksi',
        color: 'primary',
        icon: <ReceiptRounded />,
        onClick: () => {
          navigate('/order-list');
          setIsMenuDialogOpen(false);
        },
      },
      {
        label: 'Wishlist',
        color: 'primary',
        icon: <FavoriteRounded />,
        onClick: () => {},
      },
      {
        label: 'Alamat',
        color: 'primary',
        icon: <HomeRounded />,
        onClick: () => {
          navigate('/user/address');
          setIsMenuDialogOpen(false);
        },
      },
      {
        label: 'Keluar',
        color: 'error',
        icon: <LogoutRounded />,
        onClick: () => {
          dispatch(asyncUnsetAuthUser());
          setIsMenuDialogOpen(false);
          navigate('/');
        },
      },
    ];
    if (authUser.isAdmin || authUser.WarehouseUser.deletedAt === null) {
      menu.unshift({
        label: 'Admin',
        color: 'primary',
        icon: <AdminPanelSettingsRounded />,
        onClick: () => navigate('/admin/dashboard'),
      });
    }
    return menu;
  }, []);

  return (
    <Dialog onClose={() => setIsMenuDialogOpen(false)} open={isMenuDialogOpen}>
      <DialogTitle align="center">Menu</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          {allMenu.map((menu) => (
            <Button
              key={menu.label}
              onClick={menu.onClick}
              variant="contained"
              color={menu.color}
              startIcon={menu.icon}
              sx={{ textTransform: 'none' }}
            >
              {menu.label}
            </Button>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

MenuDialog.propTypes = {
  isMenuDialogOpen: bool.isRequired,
  setIsMenuDialogOpen: func.isRequired,
};

export default MenuDialog;

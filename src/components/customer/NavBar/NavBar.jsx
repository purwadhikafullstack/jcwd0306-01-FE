import {
  CategoryRounded,
  HomeRounded,
  LoginRounded,
  MenuRounded,
  ReceiptRounded,
} from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuDialog from './MenuDialog';

function NavBar() {
  const authUser = useSelector((states) => states.authUser);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [value, setValue] = useState('');
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);
  const location = useLocation();
  const pathLocation = location.pathname.split('/')[1];

  useEffect(() => {
    if (isMenuDialogOpen === false && value === 'menu') setValue('');
  }, [isMenuDialogOpen]);

  if (isSmUp || !['', 'order-list', 'user'].includes(pathLocation)) return null;

  return (
    <>
      <Box height="5rem" />
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          overflow: 'auto',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          {/* Home button */}
          <BottomNavigationAction
            onClick={() => navigate('/')}
            value="home"
            label="Home"
            icon={<HomeRounded />}
          />

          {/* Product button */}
          <BottomNavigationAction
            value="products"
            label="Produk"
            icon={<CategoryRounded />}
          />

          {/* Order button */}
          {authUser !== null && (
            <BottomNavigationAction
              onClick={() => navigate('/order-list')}
              value="orders"
              label="Transaksi"
              icon={<ReceiptRounded />}
            />
          )}

          {authUser !== null ? (
            // Menu button
            <BottomNavigationAction
              onClick={() => setIsMenuDialogOpen(true)}
              value="menu"
              label="Menu"
              icon={<MenuRounded />}
            />
          ) : (
            // Login button
            <BottomNavigationAction
              onClick={() => navigate('/login')}
              value="login"
              label="Masuk"
              icon={<LoginRounded />}
            />
          )}
        </BottomNavigation>
      </Paper>

      {authUser !== null && value === 'menu' && (
        <MenuDialog
          isMenuDialogOpen={isMenuDialogOpen}
          setIsMenuDialogOpen={setIsMenuDialogOpen}
        />
      )}
    </>
  );
}

export default NavBar;

import {
  Box,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { MenuRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import GadgetGalleryLogo from '../../../GadgetGalleryLogo';
import GGLogo from '../../../GGLogo';
import AccountButton from './AccountButton';
import NotificationButton from './NotificationButton';
import MessageButton from './MessageButton';
import api from '../../../../constants/api';

function MainToolbar({ setIsDrawerOpen }) {
  const authUser = useSelector((states) => states.authUser);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [whName, setWhName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(
          `/warehouses/${authUser?.WarehouseUser?.warehouseId}`
        );
        setWhName(res?.data?.data?.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [authUser]);

  return (
    <Toolbar sx={{ gap: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={() => setIsDrawerOpen((prevState) => !prevState)}>
          <MenuRounded />
        </IconButton>

        {/* Show GadgetGallery / GG Logo */}
        {isMdDown ? (
          <GGLogo sx={{ fontSize: '2rem' }} />
        ) : (
          <GadgetGalleryLogo sx={{ fontSize: '2rem' }} />
        )}

        <Typography color="text.secondary" variant="subtitle2" fontSize="1rem">
          {authUser?.isAdmin ? 'Admin' : `Warehouse Admin: ${whName}`}
        </Typography>
      </Stack>

      <Box flexGrow={1} />

      {/* Show Notification, Message Button */}
      <Stack direction="row" sx={{ gap: 1 }}>
        <NotificationButton />
        <MessageButton />
      </Stack>

      {/* Show Divider */}
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          bgcolor: 'text.secondary',
          [theme.breakpoints.down('sm')]: { display: 'none' },
        }}
      />

      {/* Show Account Button */}
      <AccountButton />
    </Toolbar>
  );
}

export default MainToolbar;

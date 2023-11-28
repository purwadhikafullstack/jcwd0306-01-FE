import {
  Box,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  DarkModeRounded,
  LightModeRounded,
  MenuRounded,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import GadgetGalleryLogo from '../../../GadgetGalleryLogo';
import GGLogo from '../../../GGLogo';
import AccountButton from './AccountButton';
import NotificationButton from './NotificationButton';
import MessageButton from './MessageButton';
import ModeContext from '../../../../contexts/ModeContext';

function MainToolbar({ setIsDrawerOpen }) {
  const authUser = useSelector((states) => states.authUser);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, toggleMode } = useContext(ModeContext);

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

        {!isMdDown && (
          <Typography
            color="text.secondary"
            variant="subtitle2"
            fontSize="1rem"
          >
            {authUser?.isAdmin
              ? 'Admin'
              : `Warehouse Admin: ${authUser.WarehouseUser.Warehouse.name}`}
          </Typography>
        )}
      </Stack>

      <Box flexGrow={1} />

      {/* Show Notification, Message, light/dark mode Button */}
      <Stack direction="row" sx={{ gap: 1 }}>
        <NotificationButton />
        <MessageButton />
        {!isMdDown && (
          <Tooltip arrow title={`Mode ${mode === 'dark' ? 'terang' : 'gelap'}`}>
            <IconButton onClick={toggleMode}>
              {mode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      {!isMdDown && (
        <>
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
        </>
      )}
    </Toolbar>
  );
}

export default MainToolbar;

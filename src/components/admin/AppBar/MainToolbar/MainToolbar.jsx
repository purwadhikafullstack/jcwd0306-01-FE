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
import GadgetGalleryLogo from '../../../GadgetGalleryLogo';
import GGLogo from '../../../GGLogo';
import AccountButton from './AccountButton';
import NotificationButton from './NotificationButton';
import MessageButton from './MessageButton';

function MainToolbar({ setIsDrawerOpen }) {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

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
          Admin
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

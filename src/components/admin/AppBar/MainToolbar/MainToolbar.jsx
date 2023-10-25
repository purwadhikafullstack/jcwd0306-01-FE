import {
  Box,
  Divider,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import GadgetGalleryLogo from '../../../GadgetGalleryLogo';
import GGLogo from '../../../GGLogo';
import AccountButton from './AccountButton';
import NotificationButton from './NotificationButton';

function MainToolbar() {
  const theme = useTheme();

  return (
    <Toolbar sx={{ gap: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box>
          {/* Show GadgetGallery Logo */}
          <GadgetGalleryLogo
            sx={{
              fontSize: '2rem',
              [theme.breakpoints.down('md')]: { display: 'none' },
            }}
          />

          {/* Show GG Logo */}
          <GGLogo
            sx={{
              fontSize: '2rem',
              [theme.breakpoints.down('sm')]: { display: 'none' },
              [theme.breakpoints.up('md')]: { display: 'none' },
            }}
          />
        </Box>

        <Typography color="text.secondary" variant="subtitle2" fontSize="1rem">
          Admin
        </Typography>
      </Stack>

      <Box flexGrow={1} />

      {/* Show Notification Button */}
      <NotificationButton />

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
      <Stack
        direction="row"
        spacing={2}
        sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}
      >
        <AccountButton />
      </Stack>
    </Toolbar>
  );
}

export default MainToolbar;

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';

export function HeaderChooseAddress({ handleClose, Title = '' }) {
  return (
    <AppBar
      sx={{
        position: 'relative',
        backgroundColor: 'white',
        color: `black`,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          sx={{ mx: 2, flex: 1, textAlign: 'center' }}
          variant="h6"
          component="div"
        >
          {Title}
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

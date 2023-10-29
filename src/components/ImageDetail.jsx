import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function ImageDetail({ imgSrc = '', open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () => setOpen('');
  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      maxWidth="xl"
      open={open}
      onClose={handleClose}
    >
      <AppBar
        sx={{ position: 'relative', display: 'flex', direction: 'row-reverse' }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
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
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <img
          id="paymentProof"
          alt="paymentProof receipt"
          src={imgSrc}
          style={{ width: '100%' }}
        />
      </div>
    </Dialog>
  );
}

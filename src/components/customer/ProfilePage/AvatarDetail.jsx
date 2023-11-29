import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertActionCreator } from '../../../states/alert/action';
import { asyncDeleteImage } from '../../../states/authUser/action';

export function AvatarDetail({
  imgSrc = '',
  open,
  setOpen,
  showPreviousModal,
}) {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () => {
    setOpen(false);
    if (showPreviousModal) showPreviousModal(true);
  };
  const handleDelete = async () => {
    try {
      dispatch(asyncDeleteImage(authUser?.id));
      dispatch(
        setAlertActionCreator({
          val: { status: 'success', message: 'success delete photo' },
        })
      );
      window.location.reload();
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
  };

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      maxWidth="xs"
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
          id="avatar"
          alt="no avatar"
          src={imgSrc}
          style={{ width: '100%' }}
        />
      </div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          bgcolor: 'bisque',
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: '#fd2939',
            ':hover': { bgcolor: 'red' },
            display: imgSrc ? '' : 'none',
          }}
          onClick={() => {
            handleDelete();
            setOpen(false);
          }}
        >
          Delete
        </Button>
      </Box>
    </Dialog>
  );
}

import { Button, Alert as MuiAlert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useRef } from 'react';
import { unsetAlertActionCreator } from '../states/alert/action';
import BubleNotification from '../assets/BubblePopAlertNotification.wav';

function Alert() {
  const alert = useSelector((states) => states.alert);
  const dispatch = useDispatch();
  const notifSound = useRef(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(unsetAlertActionCreator());
  };

  return (
    <>
      <Button
        hidden
        id="startBubleNotification"
        onClick={() => {
          notifSound.current.play();
        }}
      >
        Play
      </Button>
      <audio src={BubleNotification} id="BubleNotification" ref={notifSound}>
        <track kind="captions" />
      </audio>
      <Snackbar
        open={alert.open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleClose}
          severity={alert.status}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Alert;

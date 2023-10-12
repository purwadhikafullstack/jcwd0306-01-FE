import { Alert as MuiAlert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { unsetAlertActionCreator } from '../states/alert/action';

function Alert() {
  const alert = useSelector((states) => states.alert);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(unsetAlertActionCreator());
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={alert.status}
        sx={{ width: '100%' }}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
}

export default Alert;

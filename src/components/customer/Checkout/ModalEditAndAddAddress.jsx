import { Dialog, TextField, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import Slide from '@mui/material/Slide';
import { HeaderChooseAddress } from './ModalChooseAddress/HeaderChooseAddress';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export function ModalEditAndAddAddress({ open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () => setOpen('CHOOSE_ADDRESS');
  return (
    <div>
      <Dialog
        open={open === 'ADD_ADDRESS' || open === 'EDIT_ADDRESS'}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth
        aria-describedby="alert-dialog-slide-description"
      >
        <HeaderChooseAddress handleClose={handleClose} Title="ADD ADDRESS" />
        <div className="my-3">
          <TextField
            autoFocus
            margin="dense"
            id="address-label"
            label="Address Label (e.g. Central Tower)"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="province"
            label="Province"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="district"
            label="District"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="village"
            label="Village"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="postal-code"
            label="Postal Code"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="detail-address"
            label="Detail Address (e.g. RT/RW Number)"
            type="text"
            fullWidth
            variant="standard"
          />
        </div>
      </Dialog>
    </div>
  );
}

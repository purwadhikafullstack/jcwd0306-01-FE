import * as React from 'react';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { StatusInvoice } from './ModalDetailTransaction/StatusInvoice';
import { Products } from './ModalDetailTransaction/Products';
import { ShippingInfo } from './ModalDetailTransaction/ShippingInfo';
import { PriceInfo } from './ModalDetailTransaction/PriceInfo';
import { HeaderModal } from '../../HeaderModal';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export function ModalDetailTransaction({ order = {}, open, setOpen }) {
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      fullScreen={fullScreen}
      aria-describedby="alert-dialog-slide-description"
      scroll="paper"
    >
      <HeaderModal handleClose={handleClose} Title="Transaction Details" />
      <DialogContent>
        <Stack gap={2}>
          <StatusInvoice order={order} />
          <Products order={order} />
          <ShippingInfo order={order} />
          <PriceInfo order={order} />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

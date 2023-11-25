import * as React from 'react';
import { Fade, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import { StatusInvoice } from './ModalDetailTransaction/StatusInvoice';
import { Products } from './ModalDetailTransaction/Products';
import { ShippingInfo } from './ModalDetailTransaction/ShippingInfo';
import { PriceInfo } from './ModalDetailTransaction/PriceInfo';
import { HeaderModal } from '../../HeaderModal';
import { PaymentProof } from './ModalDetailTransaction/PaymentProof';
import { VerficationActionButton } from '../../admin/TransactionPage/VerficationActionButton';

const Transition = React.forwardRef((props, ref) => (
  <Fade ref={ref} {...props} />
));

export function ModalDetailTransaction({
  order = {},
  open,
  setOpen,
  setShow,
  imgSrc,
  transactions,
  setTransactions,
}) {
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [receipt, setreceipt] = useState(null);

  const handleChange = (e) => {
    setreceipt(e.target.value);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      maxWidth="sm"
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
          {imgSrc ? ( // special for admin detail transaction modal
            <>
              <PaymentProof
                imgSrc={imgSrc}
                setShow={setShow}
                setOpen={setOpen}
              />
              {order.status === 'processed' && (
                <TextField
                  label="input shipping receipt"
                  onChange={handleChange}
                  error={!receipt}
                  required
                />
              )}
              <VerficationActionButton
                order={order}
                setOpen={setOpen}
                transactions={transactions}
                setTransactions={setTransactions}
                receipt={receipt}
              />
            </>
          ) : null}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

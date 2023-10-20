import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function MobileShoppingSummaryDialog({
  open,
  setOpen,
  summaryTransaction,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const totalPrice = summaryTransaction.get(`totalPrice`);
  const totalDiscount = summaryTransaction.get(`totalDiscount`);
  const totalItems = summaryTransaction.get(`totalItems`);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullScreen
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            position: 'fixed',
            bottom: 0,
            maxHeight: '160px',
            borderTopRightRadius: '20px',
            borderTopLeftRadius: '20px',
          },
        }}
      >
        <DialogTitle>Shopping Summary</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="d-flex justify-content-between">
              <div>Total Price ({totalItems} items)</div>
              <div>Rp{totalPrice.toLocaleString(`id-ID`)}</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>Total Discount</div>
              <div>Rp{totalDiscount.toLocaleString(`id-ID`)}</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>Grand Total</div>
              <div>
                Rp{(totalPrice - totalDiscount).toLocaleString(`id-ID`)}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

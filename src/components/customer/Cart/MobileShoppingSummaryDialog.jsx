import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function MobileShoppingSummaryDialog({
  open,
  setOpen,
  summaryTransaction,
  grandTotal,
}) {
  const handleClose = () => {
    setOpen(false);
  };

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
            maxHeight: '300px',
            borderTopRightRadius: '20px',
            borderTopLeftRadius: '20px',
          },
        }}
      >
        <DialogTitle>Shopping Summary</DialogTitle>
        <DialogContent>
          <div id="alert-dialog-slide-description">
            {[...summaryTransaction.keys()].map((key) =>
              summaryTransaction.get(key).amount ? (
                <div
                  className="d-flex justify-content-between"
                  key={summaryTransaction.get(key).name}
                >
                  <div>{summaryTransaction.get(key).name}</div>
                  <div>
                    {key !== 'totalItems'
                      ? `${
                          key === 'totalDiscount' ? '-' : ''
                        }Rp${summaryTransaction
                          .get(key)
                          .amount.toLocaleString(`id-ID`)}`
                      : `${summaryTransaction
                          .get(key)
                          .amount.toLocaleString(`id-ID`)} items`}
                  </div>
                </div>
              ) : null
            )}
            <div className="d-flex justify-content-between">
              <div>
                <b>Grand total:</b>
              </div>
              <div>Rp{grandTotal.toLocaleString(`id-ID`)}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

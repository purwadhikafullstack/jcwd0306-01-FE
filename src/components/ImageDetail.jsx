import { Dialog } from '@mui/material';

export function ImageDetail({ imgSrc = '', open, setOpen }) {
  const handleClose = () => setOpen('');
  return (
    <Dialog fullWidth maxWidth="xl" open={open} onClose={handleClose}>
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

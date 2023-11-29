import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

function DeleteDialog({ isOpen, onClose, deleteAddress }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>apakah anda yakin ingin menghapus alamat?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          tidak
        </Button>
        <Button
          onClick={() => {
            deleteAddress();
            onClose();
          }}
          variant="contained"
        >
          ya
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;

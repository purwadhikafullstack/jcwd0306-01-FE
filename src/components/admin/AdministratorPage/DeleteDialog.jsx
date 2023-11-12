import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

function DeleteDialog({ isOpen, onClose, warehouseId, userIds, deleteAdmin }) {
  // console.log({ whId: warehouseId, userIds });
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        apakah anda yakin ingin menghapus warehouse admin?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>tidak</Button>
        <Button
          onClick={() => {
            deleteAdmin(warehouseId, userIds);
            onClose();
          }}
        >
          ya
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;

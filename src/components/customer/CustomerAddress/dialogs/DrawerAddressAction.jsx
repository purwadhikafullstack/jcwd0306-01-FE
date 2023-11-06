import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Stack,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import AddressAction, {
  DefaultAddressDialog,
} from '../actions/AddressCardAction';
import DeleteDialog from './DeleteDialog';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function DrawerActionDialog({
  isOpen,
  onClose,
  setOpen,
  address,
  setAddressToEdit,
  deleteAddress,
  setDefaultAddress,
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [defaultAddressDialogOpen, setDefaultAddressDialogOpen] =
    useState(false);

  const handleDefaultDialogOpen = () => {
    setDefaultAddressDialogOpen(true);
  };
  const handleDefaultDialogClose = () => {
    setDefaultAddressDialogOpen(false);
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullScreen
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        sx: {
          position: 'fixed',
          bottom: 0,
          maxHeight: '200px',
          borderTopRightRadius: '20px',
          borderTopLeftRadius: '20px',
        },
      }}
    >
      <Box display="flex" alignItems="center" ml="1rem">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle>Pilihan Lainnya</DialogTitle>
      </Box>
      <DialogActions
        sx={{ display: 'flex', justifyContent: 'center', pt: '0px' }}
      >
        <Stack display="flex" justifyContent="flex-start" spacing={0}>
          <Button
            onClick={() => {
              handleDefaultDialogOpen();
              // setDefaultAddress();
            }}
            sx={{ display: address.isDefault ? 'none' : 'inline-block' }}
          >
            jadikan alamat utama
          </Button>
          <Button
            onClick={() => {
              setAddressToEdit(address);
              setOpen('EDIT ADDRESS');
              onClose();
            }}
          >
            ubah alamat
          </Button>
          <Button
            onClick={handleDeleteDialogOpen}
            sx={{
              color: 'red',
              display: address.isDefault ? 'none' : 'inline-block',
            }}
          >
            hapus
          </Button>
          <DeleteDialog
            isOpen={deleteDialogOpen}
            onClose={handleDeleteDialogClose}
            deleteAddress={deleteAddress}
          />
        </Stack>

        {/* modal default address confirmation */}
        <DefaultAddressDialog
          isOpen={defaultAddressDialogOpen}
          onClose={handleDefaultDialogClose}
          address={address}
          setDefaultAddress={setDefaultAddress}
          tutup={onClose}
        />
      </DialogActions>
    </Dialog>
  );
}

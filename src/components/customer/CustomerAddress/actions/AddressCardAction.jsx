import {
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useState } from 'react';
import DeleteDialog from '../dialogs/DeleteDialog';

export default function AddressAction({
  isDesktop,
  deleteAddress,
  setOpen,
  setAddressToEdit,
  address,
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
    <CardActions sx={{ display: isDesktop ? 'block' : 'none' }}>
      <Button
        sx={{ fontSize: isDesktop ? '13px' : '10px' }}
        onClick={() => {
          setAddressToEdit(address);
          setOpen('EDIT ADDRESS');
        }}
      >
        Ubah Alamat
      </Button>
      <HorizontalRuleIcon
        sx={{
          transform: 'rotate(90deg)',
          fontSize: '12px',
          display: address?.isDefault === true ? 'none' : 'inline-block',
        }}
      />
      <Button
        sx={{
          fontSize: isDesktop ? '13px' : '10px',
          display: address?.isDefault === true ? 'none' : 'inline-block',
        }}
        onClick={handleDefaultDialogOpen}
      >
        Jadikan Alamat Utama
      </Button>
      <DefaultAddressDialog
        isOpen={defaultAddressDialogOpen}
        onClose={handleDefaultDialogClose}
        setDefaultAddress={setDefaultAddress}
        address={address}
      />

      <HorizontalRuleIcon
        sx={{
          transform: 'rotate(90deg)',
          fontSize: '12px',
          display: address?.isDefault === true ? 'none' : 'inline-block',
        }}
      />
      <Button
        sx={{
          fontSize: isDesktop ? '13px' : '10px',
          display: address?.isDefault === true ? 'none' : 'inline-block',
          color: 'white',
          bgcolor: '#ff372f',
          ':hover': { bgcolor: 'red' },
        }}
        onClick={handleDeleteDialogOpen}
        size="small"
      >
        Hapus
      </Button>
      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        deleteAddress={deleteAddress}
      />
    </CardActions>
  );
}

export function DefaultAddressDialog({
  isOpen,
  onClose,
  setDefaultAddress,
  address,
}) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        jadikan{' '}
        <span
          style={{ fontWeight: 'bold', textDecoration: 'underline' }}
        >{`${address?.addressName}`}</span>{' '}
        alamat utama dan pilih?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Tidak</Button>
        <Button
          onClick={() => {
            setDefaultAddress();
            onClose();
          }}
        >
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { Button, CardActions } from '@mui/material';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useState } from 'react';
import DeleteDialog from '../dialogs/DeleteDialog';

export default function AddressAction({
  isDesktop,
  deleteAddress,
  setOpen,
  setAddressToEdit,
  address,
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
        }}
      />
      <Button sx={{ fontSize: isDesktop ? '13px' : '10px' }}>
        Jadikan Alamat Utama
      </Button>
      <HorizontalRuleIcon
        sx={{
          transform: 'rotate(90deg)',
          fontSize: '12px',
        }}
      />
      <Button
        sx={{ fontSize: isDesktop ? '13px' : '10px' }}
        onClick={handleDeleteDialogOpen}
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

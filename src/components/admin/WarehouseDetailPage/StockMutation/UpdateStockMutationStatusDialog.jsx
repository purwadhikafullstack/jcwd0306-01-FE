import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { bool, func, number } from 'prop-types';
import { useParams } from 'react-router-dom';
import { ArrowForwardRounded, CancelRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {
  asyncDeleteStockMutation,
  asyncUpdateStockMutationStatus,
} from '../../../../states/stockMutations/action';
import useSwal from '../../../../hooks/useSwal';

const arrStatus = [
  { label: 'Diminta', value: 'requested' },
  { label: 'Diproses', value: 'processed' },
  { label: 'Dikirim', value: 'shipped' },
  { label: 'Diterima', value: 'received' },
];

function UpdateStockMutationStatusDialog({
  stockMutationId,
  isUpdateStockMutationStatusDialogOpen,
  setIsUpdateStockMutationStatusDialogOpen,
}) {
  const stockMutations = useSelector((states) => states.stockMutations);
  const dispatch = useDispatch();
  const { warehouseId } = useParams();
  const [stockMutation, setStockMutation] = useState(null);
  const Swal = useSwal();

  useEffect(() => {
    setStockMutation(stockMutations.find((val) => val.id === stockMutationId));
  }, [stockMutations, stockMutationId]);

  const handleClickUpdateStockMutationStatus = async (newStatus) => {
    await Swal.fire({
      icon: 'warning',
      title: (
        <Typography>
          Status mutasi stok akan diupdate menjadi
          <Typography
            component="span"
            sx={{ fontWeight: 600, '&::before': { content: '" "' } }}
          >
            {newStatus}
          </Typography>
        </Typography>
      ),
      showDenyButton: true,
      denyButtonText: 'Batalkan',
      showConfirmButton: true,
      confirmButtonText: 'Konfirmasi',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        await dispatch(
          asyncUpdateStockMutationStatus(stockMutation.id, {
            status: newStatus,
          })
        );
      },
    });
  };

  const handleClickDeleteStockMutation = async () => {
    await Swal.fire({
      icon: 'warning',
      title: (
        <Typography>
          Permintaan mutasi stok akan
          <Typography
            component="span"
            sx={{ fontWeight: 600, '&::before': { content: '" "' } }}
          >
            dihapus
          </Typography>
        </Typography>
      ),
      showDenyButton: true,
      denyButtonText: 'Batalkan',
      showConfirmButton: true,
      confirmButtonText: 'Konfirmasi',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        await dispatch(asyncDeleteStockMutation(stockMutation.id));
        setIsUpdateStockMutationStatusDialogOpen(false);
      },
    });
  };

  if (!stockMutation) return null;

  return (
    <Dialog fullWidth open={isUpdateStockMutationStatusDialogOpen}>
      <DialogActions disableSpacing sx={{ p: 0 }}>
        <IconButton
          onClick={() => setIsUpdateStockMutationStatusDialogOpen(false)}
          color="error"
        >
          <CancelRounded />
        </IconButton>
      </DialogActions>
      <DialogTitle sx={{ pt: 0, textAlign: 'center', fontWeight: 700 }}>
        Mutasi Stok
      </DialogTitle>
      <DialogContent>
        <Typography p={2} fontWeight={600}>
          {stockMutation.Product.name}
        </Typography>
        <Stack spacing={2} py={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            {/* from warehouse */}
            <TextField
              fullWidth
              InputProps={{ readOnly: true }}
              label="Gudang Asal"
              size="small"
              value={stockMutation.fromWarehouse.name}
            />

            <ArrowForwardRounded sx={{ color: 'info.main' }} />

            {/* to warehouse */}
            <TextField
              fullWidth
              InputProps={{ readOnly: true }}
              label="Gudang Tujuan"
              size="small"
              value={stockMutation.toWarehouse.name}
            />
          </Stack>

          <Divider sx={{ borderWidth: '0.1rem', borderRadius: '5rem' }} />

          {/* when stock mutation is not rejected */}
          {stockMutation.status !== 'rejected' && (
            <Stepper
              activeStep={arrStatus.findIndex(
                (status) => status.value === stockMutation.status
              )}
              alternativeLabel
            >
              {arrStatus.map((status) => (
                <Step key={status.value}>
                  <StepLabel>{status.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}

          {/* when stock mutation is rejected */}
          {stockMutation.status === 'rejected' && (
            <Stepper alternativeLabel>
              <Step>
                <StepLabel error>Mutasi stok ditolak</StepLabel>
              </Step>
            </Stepper>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-around' }}>
        {/* Reject button */}
        {Number(warehouseId) === stockMutation.fromWarehouseId &&
          !['rejected', 'received'].includes(stockMutation.status) && (
            <Button
              onClick={() => handleClickUpdateStockMutationStatus('rejected')}
              variant="contained"
              color="error"
              sx={{ textTransform: 'none' }}
            >
              Tolak mutasi
            </Button>
          )}

        {/* Delete button */}
        {Number(warehouseId) === stockMutation.toWarehouseId &&
          stockMutation.status === 'requested' && (
            <Button
              onClick={handleClickDeleteStockMutation}
              variant="contained"
              color="error"
              sx={{ textTransform: 'none' }}
            >
              Hapus permintaan mutasi
            </Button>
          )}

        {/* Update to processed button */}
        {Number(warehouseId) === stockMutation.fromWarehouseId &&
          stockMutation.status === 'requested' && (
            <Button
              onClick={() => handleClickUpdateStockMutationStatus('processed')}
              variant="contained"
              color="secondary"
              sx={{ textTransform: 'none' }}
            >
              Update ke diproses
            </Button>
          )}

        {/* Update to shipped button */}
        {Number(warehouseId) === stockMutation.fromWarehouseId &&
          stockMutation.status === 'processed' && (
            <Button
              onClick={() => handleClickUpdateStockMutationStatus('shipped')}
              variant="contained"
              color="info"
              sx={{ textTransform: 'none' }}
            >
              Update ke dikirim
            </Button>
          )}

        {/* Update to received button */}
        {Number(warehouseId) === stockMutation.toWarehouseId &&
          stockMutation.status === 'shipped' && (
            <Button
              onClick={() => handleClickUpdateStockMutationStatus('received')}
              variant="contained"
              color="success"
              sx={{ textTransform: 'none' }}
            >
              Update ke diterima
            </Button>
          )}
      </DialogActions>
    </Dialog>
  );
}

UpdateStockMutationStatusDialog.propTypes = {
  stockMutationId: number.isRequired,
  isUpdateStockMutationStatusDialogOpen: bool.isRequired,
  setIsUpdateStockMutationStatusDialogOpen: func.isRequired,
};

export default UpdateStockMutationStatusDialog;

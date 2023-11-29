import { EditRounded } from '@mui/icons-material';
import {
  Box,
  Chip,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import UpdateStockMutationStatusDialog from './UpdateStockMutationStatusDialog';

function StockMutationTableItem() {
  const stockMutations = useSelector((states) => states.stockMutations);
  const stockMutationPagination = useSelector(
    (states) => states.stockMutationPagination
  );
  const [stockMutationId, setStockMutationId] = useState(null);
  const [
    isUpdateStockMutationStatusDialogOpen,
    setIsUpdateStockMutationStatusDialogOpen,
  ] = useState(false);

  const handleClickUpdateStockMutationStatus = (val) => {
    setStockMutationId(val.id);
    setIsUpdateStockMutationStatusDialogOpen(true);
  };

  return (
    <>
      <TableBody>
        {/* When stock mutations not found */}
        {!stockMutations.length && (
          <TableRow>
            <TableCell colSpan={10}>
              <Typography variant="body2" align="center">
                Mutasi stok tidak ditemukan
              </Typography>
            </TableCell>
          </TableRow>
        )}

        {/* When stock mutations exist */}
        {stockMutations.map((val, idx) => (
          <TableRow key={val.id} hover>
            {/* No. column */}
            <TableCell align="center">
              {stockMutationPagination.offset + idx + 1}
            </TableCell>

            {/* Type column */}
            <TableCell align="center">
              <Box
                sx={{
                  minWidth: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                {val.type}
              </Box>
            </TableCell>

            {/* Product Name column */}
            <TableCell>
              <Box sx={{ minWidth: '15rem' }}>{val.Product.name}</Box>
            </TableCell>

            {/* Status column */}
            <TableCell>
              <Stack
                direction="row"
                spacing={1}
                sx={{ minWidth: '1rem', justifyContent: 'space-between' }}
              >
                <Chip
                  label={val.status}
                  color={(() => {
                    if (val.status === 'rejected') return 'error';
                    if (val.status === 'requested') return 'warning';
                    if (val.status === 'processed') return 'secondary';
                    if (val.status === 'shipped') return 'info';
                    if (val.status === 'received') return 'success';
                    return 'default';
                  })()}
                />

                <Tooltip title="Update status" arrow>
                  <IconButton
                    onClick={() => handleClickUpdateStockMutationStatus(val)}
                    sx={{ '&:hover': { color: 'info.main' } }}
                  >
                    <EditRounded sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </TableCell>

            {/* Quantity column */}
            <TableCell align="center">
              <Box sx={{ minWidth: '1rem' }}>{val.quantity}</Box>
            </TableCell>

            {/* From Warehouse column */}
            <TableCell>
              <Box sx={{ minWidth: '10rem' }}>{val.fromWarehouse.name}</Box>
            </TableCell>

            {/* To Warehouse column */}
            <TableCell>
              <Box sx={{ minWidth: '10rem' }}>{val.toWarehouse.name}</Box>
            </TableCell>

            {/* OrderId column */}
            <TableCell align="center">
              <Box sx={{ minWidth: '10rem' }}>{val.orderId || '-'}</Box>
            </TableCell>

            {/* createdAt column */}
            <TableCell align="center">
              <Box sx={{ minWidth: '12rem' }}>
                {new Date(val.createdAt).toLocaleString('id-ID', {
                  timeZoneName: 'short',
                })}
              </Box>
            </TableCell>

            {/* updatedAt column */}
            <TableCell align="center">
              <Box sx={{ minWidth: '12rem' }}>
                {new Date(val.updatedAt).toLocaleString('id-ID', {
                  timeZoneName: 'short',
                })}
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* Update Stock Mutation Status */}
      {stockMutationId !== null && (
        <UpdateStockMutationStatusDialog
          stockMutationId={stockMutationId}
          isUpdateStockMutationStatusDialogOpen={
            isUpdateStockMutationStatusDialogOpen
          }
          setIsUpdateStockMutationStatusDialogOpen={
            setIsUpdateStockMutationStatusDialogOpen
          }
        />
      )}
    </>
  );
}

export default StockMutationTableItem;

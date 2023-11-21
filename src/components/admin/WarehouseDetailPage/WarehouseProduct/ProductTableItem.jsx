import {
  CancelRounded,
  CheckCircleRounded,
  EditRounded,
  LocalShippingRounded,
} from '@mui/icons-material';
import {
  Avatar,
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
import DescriptionTableCell from './DescriptionTableCell';
import UpdateStockDialog from './UpdateStockDialog';
import CreateStockMutationDialog from './CreateStockMutationDialog';

function ProductTableItem() {
  const products = useSelector((states) => states.products);
  const productPagination = useSelector((states) => states.productPagination);
  const [productId, setProductId] = useState(null);
  const [isUpdateStockDialogOpen, setIsUpdateStockDialogOpen] = useState(false);
  const [isCreateStockMutationDialogOpen, setIsCreateStockMutationDialogOpen] =
    useState(false);

  const handleClickCreateStockMutation = (val) => {
    setProductId(val.id);
    setIsCreateStockMutationDialogOpen(true);
  };
  const handleClickUpdateStockButton = (val) => {
    setProductId(val.id);
    setIsUpdateStockDialogOpen(true);
  };

  return (
    <>
      <TableBody>
        {/* When product not found */}
        {products.length === 0 && (
          <TableRow>
            <TableCell colSpan={13}>
              <Typography variant="body2" align="center">
                Produk tidak ditemukan
              </Typography>
            </TableCell>
          </TableRow>
        )}
        {/* When product exist */}
        {products.length !== 0 &&
          products.map((val, idx) => (
            <TableRow key={val.id} hover>
              {/* No. column */}
              <TableCell>{productPagination.offset + idx + 1}</TableCell>
              {/* Status column */}
              <TableCell>
                {val.deletedAt === null ? (
                  <Tooltip title="Status: Aktif">
                    <CheckCircleRounded color="success" />
                  </Tooltip>
                ) : (
                  <Tooltip title="Status: Nonaktif">
                    <CancelRounded color="error" />
                  </Tooltip>
                )}
              </TableCell>
              {/* Image column */}
              <TableCell>
                <Avatar
                  variant="square"
                  alt={val.name}
                  src={`${import.meta.env.VITE_API_BASE_URL}/products/images/${
                    val.imageIds[0]
                  }`}
                />
              </TableCell>
              {/* Name column */}
              <TableCell>
                <Box sx={{ minWidth: '15rem' }}>{val.name}</Box>
              </TableCell>
              {/* Stock column */}
              <TableCell>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight={900}>
                    {val.WarehouseProducts[0].stock}
                  </Typography>
                  <Tooltip title="Update stok" arrow>
                    <IconButton
                      onClick={() => handleClickUpdateStockButton(val)}
                      sx={{ '&:hover': { color: 'info.main' } }}
                    >
                      <EditRounded sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
              {/* Stock Mutation column */}
              <TableCell align="center">
                <Box sx={{ minWidth: '6rem' }}>
                  <Tooltip title="Ajukan mutasi stok" arrow>
                    <IconButton
                      onClick={() => handleClickCreateStockMutation(val)}
                      sx={{ '&:hover': { color: 'info.main' } }}
                    >
                      <LocalShippingRounded />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
              {/* Price column */}
              <TableCell>
                <Box sx={{ minWidth: '10rem' }}>
                  {val.price.toLocaleString('id-ID')}
                </Box>
              </TableCell>
              {/* Weight column */}
              <TableCell>
                <Box sx={{ minWidth: '8rem' }}>{val.weight}</Box>
              </TableCell>
              {/* Discount column */}
              <TableCell>
                <Box sx={{ minWidth: '8rem' }}>{val.discount * 100}</Box>
              </TableCell>
              {/* Description column */}
              <DescriptionTableCell text={val.description} />
              {/* Category column */}
              <TableCell>
                <Box sx={{ minWidth: '5rem' }}>
                  {val.Categories.map((category) => (
                    <Chip
                      key={category.name}
                      label={category.name}
                      sx={{ m: '0.1rem' }}
                    />
                  ))}
                </Box>
              </TableCell>
              {/* createdAt column */}
              <TableCell>
                <Box sx={{ minWidth: '12rem' }}>
                  {new Date(val.WarehouseProducts[0].createdAt).toLocaleString(
                    'id-ID',
                    { timeZoneName: 'short' }
                  )}
                </Box>
              </TableCell>
              {/* updatedAt column */}
              <TableCell>
                <Box sx={{ minWidth: '12rem' }}>
                  {new Date(val.WarehouseProducts[0].updatedAt).toLocaleString(
                    'id-ID',
                    { timeZoneName: 'short' }
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      {/* Create Stock Mutation */}
      {productId !== null && (
        <CreateStockMutationDialog
          productId={productId}
          isCreateStockMutationDialogOpen={isCreateStockMutationDialogOpen}
          setIsCreateStockMutationDialogOpen={
            setIsCreateStockMutationDialogOpen
          }
        />
      )}
      {/* Update Stock Dialog */}
      {productId !== null && (
        <UpdateStockDialog
          productId={productId}
          isUpdateStockDialogOpen={isUpdateStockDialogOpen}
          setIsUpdateStockDialogOpen={setIsUpdateStockDialogOpen}
        />
      )}
    </>
  );
}

export default ProductTableItem;

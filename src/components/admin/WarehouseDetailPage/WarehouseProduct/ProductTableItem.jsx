import {
  CancelRounded,
  CheckCircleRounded,
  EditRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
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

function ProductTableItem() {
  const products = useSelector((states) => states.products);
  const productPagination = useSelector((states) => states.productPagination);
  const [productId, setProductId] = useState(null);
  const [isUpdateStockDialogOpen, setIsUpdateStockDialogOpen] = useState(false);

  const handleClickUpdateStockButton = (val) => {
    setProductId(val.id);
    setIsUpdateStockDialogOpen(true);
  };

  return (
    <>
      <TableBody>
        {/* When product not found */}
        {!products.length && (
          <TableRow>
            <TableCell colSpan={13}>
              <Typography variant="body2" align="center">
                Produk tidak ditemukan
              </Typography>
            </TableCell>
          </TableRow>
        )}

        {/* When product exist */}
        {products.map((val, idx) => (
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
              <Box sx={{ width: '15rem' }}>{val.name}</Box>
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

                {/* Update product stock */}
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

            {/* Stock mutation column */}
            <TableCell />

            {/* Price column */}
            <TableCell>{val.price.toLocaleString('id-ID')}</TableCell>

            {/* Weight column */}
            <TableCell>{val.weight}</TableCell>

            {/* Discount column */}
            <TableCell>{val.discount * 100}</TableCell>

            {/* Description column */}
            <DescriptionTableCell text={val.description} />

            {/* Category column */}
            <TableCell>
              <Box sx={{ width: '15rem' }}>
                {val.Categories.map((category) => category.name).join(' , ')}
              </Box>
            </TableCell>

            {/* createdAt column */}
            <TableCell>
              {new Date(val.WarehouseProducts[0].createdAt).toLocaleDateString(
                'id-ID'
              )}
            </TableCell>

            {/* updatedAt column */}
            <TableCell>
              {new Date(val.WarehouseProducts[0].updatedAt).toLocaleDateString(
                'id-ID'
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

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

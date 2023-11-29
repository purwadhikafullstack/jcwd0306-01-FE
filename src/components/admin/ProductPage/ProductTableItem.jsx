import { EditNoteRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DescriptionTableCell from './DescriptionTableCell';
import EditDialog from './EditDialog';
import StatusTableCell from './StatusTableCell';

function ProductTableItem() {
  const products = useSelector((states) => states.products);
  const productPagination = useSelector((states) => states.productPagination);
  const [product, setProduct] = useState({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleClickEditButton = (val) => {
    setProduct(val);
    setIsEditDialogOpen(true);
  };

  return (
    <>
      <TableBody>
        {/* When product not found */}
        {!products.length && (
          <TableRow>
            <TableCell colSpan={15}>
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
            <TableCell align="center">
              {productPagination.offset + idx + 1}
            </TableCell>

            {/* Status column */}
            <StatusTableCell product={val} />

            {/* Image column */}
            <TableCell align="center">
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

            {/* Action column */}
            <TableCell align="center">
              {/* Edit button */}
              <Tooltip title="Edit produk" arrow>
                <IconButton
                  onClick={() => handleClickEditButton(val)}
                  sx={{ '&:hover': { color: 'info.main' } }}
                >
                  <EditNoteRounded />
                </IconButton>
              </Tooltip>
            </TableCell>

            {/* Price column */}
            <TableCell>
              <Box sx={{ minWidth: '8rem' }}>
                {val.price.toLocaleString('id-ID')}
              </Box>
            </TableCell>

            {/* Weight column */}
            <TableCell>
              <Box sx={{ minWidth: '7rem' }}>{val.weight}</Box>
            </TableCell>

            {/* Active Stock column */}
            <TableCell align="center">
              <Box sx={{ minWidth: '9rem' }}>{val.stock}</Box>
            </TableCell>

            {/* Inactive Stock column */}
            <TableCell align="center">
              <Box sx={{ minWidth: '9rem' }}>{val.inactiveStock}</Box>
            </TableCell>

            {/* Sold column */}
            <TableCell align="center">{val.sold}</TableCell>

            {/* Discount column */}
            <TableCell align="center">
              {new Intl.NumberFormat('id-ID', {
                style: 'percent',
              }).format(val.discount)}
            </TableCell>

            {/* Description column */}
            <DescriptionTableCell text={val.description} />

            {/* Category column */}
            <TableCell align="center">
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

      {/* Edit Dialog */}
      <EditDialog
        product={product}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />
    </>
  );
}

export default ProductTableItem;

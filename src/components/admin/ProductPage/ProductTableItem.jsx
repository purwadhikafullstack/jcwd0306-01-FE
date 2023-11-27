import { EditNoteRounded } from '@mui/icons-material';
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
            <TableCell>{productPagination.offset + idx + 1}</TableCell>

            {/* Status column */}
            <StatusTableCell product={val} />

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

            {/* Price column */}
            <TableCell>{val.price.toLocaleString('id-ID')}</TableCell>

            {/* Weight column */}
            <TableCell>{val.weight}</TableCell>

            {/* Active Stock column */}
            <TableCell>{val.stock}</TableCell>

            {/* Inactive Stock column */}
            <TableCell>{val.inactiveStock}</TableCell>

            {/* Sold column */}
            <TableCell>{val.sold}</TableCell>

            {/* Discount column */}
            <TableCell>
              {new Intl.NumberFormat('id-ID', {
                style: 'percent',
              }).format(val.discount)}
            </TableCell>

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
              {new Date(val.createdAt).toLocaleDateString('id-ID')}
            </TableCell>

            {/* updatedAt column */}
            <TableCell>
              {new Date(val.updatedAt).toLocaleDateString('id-ID')}
            </TableCell>

            {/* Action column */}
            <TableCell>
              <Stack direction="row">
                {/* Edit button */}
                <Tooltip title="Edit produk" arrow>
                  <IconButton
                    onClick={() => handleClickEditButton(val)}
                    sx={{ '&:hover': { color: 'info.main' } }}
                  >
                    <EditNoteRounded />
                  </IconButton>
                </Tooltip>
              </Stack>
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

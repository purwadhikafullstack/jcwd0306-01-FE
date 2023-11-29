import { DeleteRounded, EditNoteRounded } from '@mui/icons-material';
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
import { useDispatch, useSelector } from 'react-redux';
import { asyncDeleteCategory } from '../../../states/categories/action';
import EditDialog from './EditDialog';
import useSwal from '../../../hooks/useSwal';

function CategoryTableItem() {
  const authUser = useSelector((states) => states.authUser);
  const categories = useSelector((states) => states.categories);
  const categoryPagination = useSelector((states) => states.categoryPagination);
  const dispatch = useDispatch();
  const [category, setCategory] = useState({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const Swal = useSwal();

  const handleEditButton = (val) => {
    setCategory(val);
    setIsEditDialogOpen(true);
  };

  const handleDeleteButton = async (val) => {
    await Swal.fire({
      icon: 'warning',
      title: (
        <Typography>
          Kategori
          <Typography
            component="span"
            sx={{ fontWeight: 600, '&::before, &::after': { content: '" "' } }}
          >
            {val.name}
          </Typography>
          akan dihapus secara permanen
        </Typography>
      ),
      showDenyButton: true,
      denyButtonText: 'Batalkan',
      showConfirmButton: true,
      confirmButtonText: 'Konfirmasi',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        await dispatch(asyncDeleteCategory(val.id));
      },
    });
  };

  return (
    <>
      <TableBody>
        {/* When category not found */}
        {!categories.length && (
          <TableRow>
            <TableCell colSpan={7}>
              <Typography variant="body2" align="center">
                Kategori tidak ditemukan
              </Typography>
            </TableCell>
          </TableRow>
        )}

        {/* When category exist */}
        {categories.map((val, idx) => (
          <TableRow key={val.id} hover>
            {/* No. column */}
            <TableCell align="center">
              {categoryPagination.offset + idx + 1}
            </TableCell>

            {/* Image column */}
            <TableCell align="center">
              <Avatar
                variant="square"
                alt={val.name}
                src={`${import.meta.env.VITE_API_BASE_URL}/categories/${
                  val.id
                }/image`}
              />
            </TableCell>

            {/* Name column */}
            <TableCell>
              <Box sx={{ minWidth: '15rem' }}>{val.name}</Box>
            </TableCell>

            {/* Action column */}
            {authUser.isAdmin && (
              <TableCell>
                <Stack direction="row">
                  {/* Edit button */}
                  <Tooltip title="Edit kategori" arrow>
                    <IconButton
                      onClick={() => handleEditButton(val)}
                      sx={{ '&:hover': { color: 'info.main' } }}
                    >
                      <EditNoteRounded />
                    </IconButton>
                  </Tooltip>

                  {/* Delete button */}
                  <Tooltip title="Hapus kategori" arrow>
                    <IconButton
                      value="categoryId"
                      onClick={() => handleDeleteButton(val)}
                      sx={{ '&:hover': { color: 'error.main' } }}
                    >
                      <DeleteRounded />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            )}

            {/* Total products column */}
            <TableCell align="center">
              <Box sx={{ minWidth: '8rem' }}>{val.totalProducts}</Box>
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
      {authUser.isAdmin && (
        <EditDialog
          category={category}
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
        />
      )}
    </>
  );
}

export default CategoryTableItem;

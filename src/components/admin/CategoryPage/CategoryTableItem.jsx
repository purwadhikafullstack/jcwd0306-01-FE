import { DeleteRounded, EditNoteRounded } from '@mui/icons-material';
import {
  Avatar,
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

function CategoryTableItem() {
  const dispatch = useDispatch();
  const categories = useSelector((states) => states.categories);
  const [category, setCategory] = useState({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditButton = (val) => {
    setCategory(val);
    setIsEditDialogOpen(true);
  };

  const handleDeleteButton = (categoryId) => {
    dispatch(asyncDeleteCategory(categoryId));
  };

  return (
    <>
      <TableBody>
        {/* When category not found */}
        {!categories.length && (
          <TableRow>
            <TableCell colSpan={5}>
              <Typography variant="body2" align="center">
                Kategori tidak ditemukan
              </Typography>
            </TableCell>
          </TableRow>
        )}

        {/* When category exist */}
        {categories.map((val) => (
          <TableRow key={val.id}>
            {/* ID column */}
            <TableCell>{val.id}</TableCell>

            {/* Image column */}
            <TableCell>
              <Avatar
                variant="square"
                alt={val.name}
                src={`${import.meta.env.VITE_API_BASE_URL}/categories/${
                  val.id
                }/image`}
              />
            </TableCell>

            {/* Name column */}
            <TableCell>{val.name}</TableCell>

            {/* Total products column */}
            <TableCell>{val.totalProducts}</TableCell>

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
                <Tooltip title="Edit category" arrow>
                  <IconButton
                    onClick={() => handleEditButton(val)}
                    sx={{ '&:hover': { color: 'info.main' } }}
                  >
                    <EditNoteRounded />
                  </IconButton>
                </Tooltip>

                {/* Delete button */}
                <Tooltip title="Delete category" arrow>
                  <IconButton
                    value="categoryId"
                    onClick={() => handleDeleteButton(val.id)}
                    sx={{ '&:hover': { color: 'error.main' } }}
                  >
                    <DeleteRounded />
                  </IconButton>
                </Tooltip>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* Edit Dialog */}
      <EditDialog
        category={category}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />
    </>
  );
}

export default CategoryTableItem;

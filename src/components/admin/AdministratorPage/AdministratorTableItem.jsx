/* eslint-disable no-plusplus */
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
import { useSelector } from 'react-redux';
// import EditDialog from './EditDialog';

function AdministratorTableItem() {
  const warehouseAdmin = useSelector((states) => states.administrator);

  let idCounter = 1;
  return (
    <>
      <TableBody>
        {/* When WH-admin not found */}
        {!warehouseAdmin.length && (
          <TableRow>
            <TableCell colSpan={5}>
              <Typography variant="body2" align="center">
                Kategori tidak ditemukan
              </Typography>
            </TableCell>
          </TableRow>
        )}

        {/* When category exist */}
        {warehouseAdmin.map((val) => (
          <TableRow key={val.id}>
            {/* ID column */}
            <TableCell>{idCounter++}</TableCell>

            {/* Image column */}
            <TableCell>
              <Avatar
                variant="square"
                alt={val.name}
                // src={`${import.meta.env.VITE_API_BASE_URL}/categories/${
                //   val.id
                // }/image`}
              />
            </TableCell>

            {/* Name column */}
            <TableCell>{val.User.firstName}</TableCell>

            {/* Email column */}
            <TableCell>{val.User.email}</TableCell>

            {/* Warehouse column */}
            <TableCell>{val.Warehouse.name}</TableCell>

            {/* Warehouse Address */}
            <TableCell>
              {val.Warehouse.WarehouseAddress.Province.name}
            </TableCell>

            {/* Action column */}
            <TableCell>
              <Stack direction="row">
                {/* Edit button */}
                <Tooltip title="Edit WH-admin" arrow>
                  <IconButton
                    // onClick={() => handleEditButton(val)}
                    sx={{ '&:hover': { color: 'info.main' } }}
                  >
                    <EditNoteRounded />
                  </IconButton>
                </Tooltip>

                {/* Delete button */}
                <Tooltip title="Hapus WH-admin" arrow>
                  <IconButton
                    value="categoryId"
                    onClick={/* () => handleDeleteButton(val.id) */ null}
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
      {/* <EditDialog
        category={category}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      /> */}
    </>
  );
}

export default AdministratorTableItem;

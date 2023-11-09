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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteDialog from './DeleteDialog';
import api from '../../../constants/api';
import { setAlertActionCreator } from '../../../states/alert/action';
// import EditDialog from './EditDialog';

function AdministratorTableItem() {
  const warehouseAdmin = useSelector((states) => states.administrator);
  const dispatch = useDispatch();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState({
    warehouseId: null,
    userIds: [],
  });
  // console.log(deleteDialogData);

  // warehouseAdmin.map((val) => console.log(val));

  const handleDeleteDialogOpen = (warehouseId, userId) => {
    setIsDeleteDialogOpen(true);
    setDeleteDialogData((prevData) => ({
      ...prevData,
      warehouseId,
      userIds: [...prevData.userIds, userId],
    }));
  };
  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    setDeleteDialogData({ warehouseId: null, userIds: [] });
  };

  const deleteAdmin = async (warehouseId, userIds) => {
    try {
      console.log({ warehouseId, userIds });
      await api.delete(`/warehouseusers/${warehouseId}/users`, {
        data: { userIds },
      });
      dispatch(
        setAlertActionCreator({
          val: { status: 'success', message: 'Success delete admin' },
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        setAlertActionCreator({
          val: { status: 'error', message: 'Error' },
        })
      );
    }
  };

  let idCounter = 1;
  return (
    <>
      <TableBody>
        {/* When WH-admin not found */}
        {!warehouseAdmin.length && (
          <TableRow>
            <TableCell colSpan={5}>
              <Typography variant="body2" align="center">
                Warehouse Admin tidak ditemukan
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
                    onClick={() =>
                      handleDeleteDialogOpen(val.warehouseId, val.User.id)
                    }
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

      {/* delete dialog */}
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        deleteAdmin={deleteAdmin}
        warehouseId={deleteDialogData.warehouseId}
        userIds={deleteDialogData.userIds}
      />

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

/* eslint-disable no-plusplus */
import { DeleteRounded, EditNoteRounded } from '@mui/icons-material';
import {
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
import { asyncGetWarehouseAdmin } from '../../../states/Administrator/action';
import { EditDialog } from './EditDialog';
// import EditDialog from './EditDialog';

function AdministratorTableItem() {
  const warehouseAdmin = useSelector((states) => states.administrator);
  const dispatch = useDispatch();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const [deleteDialogData, setDeleteDialogData] = useState({
    warehouseId: null,
    userIds: [],
  });
  const [editData, setEditData] = useState(null);
  const [email, setEmail] = useState(null);
  // console.log(email);

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

  const handleEditDialogOpen = (val, emailTo) => {
    setEditDialogOpen(true);
    setEditData(val);
    setEmail(emailTo);
  };
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditData(null);
  };

  const deleteAdmin = async (warehouseId, userIds) => {
    try {
      await api.delete(`/warehouseusers/${warehouseId}/users`, {
        data: { userIds },
      });
      dispatch(asyncGetWarehouseAdmin());
      dispatch(
        setAlertActionCreator({
          val: { status: 'success', message: 'Success delete admin' },
        })
      );
    } catch (error) {
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
                    onClick={() => handleEditDialogOpen(val, val.User.email)}
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
      <EditDialog
        isOpen={isEditDialogOpen}
        onClose={handleEditDialogClose}
        editData={editData}
        email={email}
      />
    </>
  );
}

export default AdministratorTableItem;

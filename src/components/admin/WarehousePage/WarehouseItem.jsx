import {
  CancelRounded,
  CheckCircleRounded,
  EditRounded,
  LocationOnRounded,
  WarehouseRounded,
} from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  instanceOf,
  number,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import { Link } from 'react-router-dom';
import {
  asyncActivateWarehouse,
  asyncDeactivateWarehouse,
} from '../../../states/warehouses/action';
import EditDialog from './EditDialog';
import useSwal from '../../../hooks/useSwal';

function WarehouseItem({ warehouse, bgColor }) {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const Swal = useSwal();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const updateWarehouseActivation = async () => {
    await Swal.fire({
      icon: 'warning',
      title: (
        <Typography>
          {`Gudang ${warehouse.name} akan`}
          <Typography
            component="span"
            sx={{ fontWeight: 600, '&::before': { content: '" "' } }}
          >
            {warehouse.deletedAt ? 'diaktifkan' : 'dinonaktifkan'}
          </Typography>
        </Typography>
      ),
      showDenyButton: true,
      denyButtonText: 'Batalkan',
      showConfirmButton: true,
      confirmButtonText: 'Konfirmasi',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        if (warehouse.deletedAt)
          await dispatch(asyncActivateWarehouse(warehouse.id));
        else await dispatch(asyncDeactivateWarehouse(warehouse.id));
      },
    });
  };

  return (
    <>
      <Card
        component="li"
        sx={{
          ...bgColor,
          minWidth: '15rem',
          color: 'white',
        }}
      >
        <CardContent
          component={Link}
          to={`/admin/warehouses/${warehouse.id}`}
          sx={{
            display: 'block',
            color: 'inherit',
            textDecoration: 'inherit',
            '&:hover': { boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.4)' },
            '&:active': { boxShadow: 'inset 0px 0px 10px rgba(0,0,0,9)' },
          }}
        >
          {/* Warehouse Name */}
          <Stack direction="row" spacing={1} alignItems="center">
            <WarehouseRounded sx={{ fontSize: '1rem' }} />
            <Typography component="span" fontWeight={600}>
              {warehouse.name}
            </Typography>
          </Stack>

          {/* Warehouse Address */}
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnRounded sx={{ fontSize: '1rem' }} />
            <Typography component="span" variant="caption">
              {`${warehouse.WarehouseAddress.City.name}, ${warehouse.WarehouseAddress.Province.name}`}
            </Typography>
          </Stack>
        </CardContent>

        {authUser.isAdmin && (
          <CardActions sx={{ justifyContent: 'center', bgcolor: 'inherit' }}>
            {/* Active / Deactivate Warehouse Button */}
            <Button
              onClick={updateWarehouseActivation}
              size="small"
              variant="contained"
              startIcon={
                warehouse.deletedAt ? <CheckCircleRounded /> : <CancelRounded />
              }
              color={warehouse.deletedAt ? 'success' : 'error'}
              sx={{
                width: 'fit-content',
                textTransform: 'none',
              }}
            >
              {warehouse.deletedAt ? 'Aktifkan' : 'Nonaktifkan'}
            </Button>

            {/* Edit Warehouse Button */}
            <Button
              onClick={() => setIsEditDialogOpen(true)}
              size="small"
              variant="contained"
              startIcon={<EditRounded />}
              sx={{
                width: 'fit-content',
                textTransform: 'none',
              }}
            >
              Ubah
            </Button>
          </CardActions>
        )}
      </Card>

      {/* Edit Warehouse Dialog */}
      <EditDialog
        warehouse={warehouse}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />
    </>
  );
}

WarehouseItem.propTypes = {
  warehouse: shape({
    id: number,
    name: string,
    WarehouseAddress: shape({
      City: shape({ name: string }),
      Province: shape({ name: string }),
    }),
    deletedAt: oneOfType([instanceOf(Date), string, oneOf([null])]),
  }).isRequired,
  bgColor: shape({ backgroundColor: string, backgroundImage: string })
    .isRequired,
};

export default WarehouseItem;

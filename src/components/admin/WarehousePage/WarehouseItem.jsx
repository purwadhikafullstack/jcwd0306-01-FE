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
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  asyncActivateWarehouse,
  asyncDeactivateWarehouse,
} from '../../../states/warehouses/action';
import EditDialog from './EditDialog';

function WarehouseItem({ warehouse, bgColor }) {
  const dispatch = useDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const activateWarehouse = () => {
    dispatch(asyncActivateWarehouse(warehouse.id));
  };

  const deactivateWarehouse = () => {
    dispatch(asyncDeactivateWarehouse(warehouse.id));
  };

  return (
    <>
      <Card
        sx={{
          ...bgColor,
          minWidth: '15rem',
          color: 'white',
        }}
      >
        <CardContent>
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
        <CardActions sx={{ justifyContent: 'center' }}>
          {/* Active / Deactivate Warehouse Button */}
          {warehouse.deletedAt === null ? (
            <Button
              onClick={deactivateWarehouse}
              size="small"
              variant="contained"
              startIcon={<CancelRounded />}
              color="error"
              sx={{
                width: 'fit-content',
                textTransform: 'none',
              }}
            >
              Nonaktifkan
            </Button>
          ) : (
            <Button
              onClick={activateWarehouse}
              size="small"
              variant="contained"
              startIcon={<CheckCircleRounded />}
              color="success"
              sx={{
                width: 'fit-content',
                textTransform: 'none',
              }}
            >
              Aktifkan
            </Button>
          )}

          {/* Edit Warehouse Button */}
          {warehouse.deletedAt === null && (
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
          )}
        </CardActions>
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

export default WarehouseItem;

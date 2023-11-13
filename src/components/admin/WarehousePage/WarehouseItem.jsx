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
import { number, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import {
  asyncActivateWarehouse,
  asyncDeactivateWarehouse,
} from '../../../states/warehouses/action';
import EditDialog from './EditDialog';

function WarehouseItem({ warehouse, bgColor }) {
  const authUser = useSelector((states) => states.authUser);
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
    deletedAt: string,
  }).isRequired,
  bgColor: shape({ backgroundColor: string, backgroundImage: string })
    .isRequired,
};

export default WarehouseItem;

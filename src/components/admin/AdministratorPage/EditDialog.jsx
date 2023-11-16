import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import api from '../../../constants/api';
import { setAlertActionCreator } from '../../../states/alert/action';
import { asyncGetWarehouseAdmin } from '../../../states/Administrator/action';

export function EditDialog({ isOpen, onClose, editData, email }) {
  const dispatch = useDispatch();
  // console.log(editData);
  // const email = editData?.User?.email;
  // console.log(email);

  const formik = useFormik({
    initialValues: {
      warehouseDestination: 0,
    },
    // validationSchema: Yup.object().shape({
    //   warehouseDestination: Yup.number().required('required!'),
    // }),
    onSubmit: async () => {
      try {
        const { id } = formik.values.warehouseDestination;
        await api.patch(`/warehouseusers/${id}`, {
          whAdminEmail: email,
        });
        dispatch(asyncGetWarehouseAdmin());
        onClose();
        dispatch(
          setAlertActionCreator({
            val: {
              status: 'success',
              message: 'success edit  warehouse admin',
            },
          })
        );
      } catch (error) {
        console.log(error);
        dispatch(
          setAlertActionCreator({
            val: {
              status: 'error',
              message: error?.response?.data?.message,
            },
          })
        );
      }
    },
  });
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose();
        formik.resetForm();
      }}
    >
      <DialogTitle>Edit Warehouse Admin</DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {`Move ${editData?.User?.firstName} from warehouse: ${editData?.Warehouse?.name} to warehouse: `}
        <WarehouseEditSelect formik={formik} />
      </DialogContent>

      <DialogActions>
        <Button onClick={formik.handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

/* Warehouse Edit Select */

function WarehouseEditSelect({ formik }) {
  const [warehouses, setWarehouses] = useState([]);
  //   console.log(warehouses);
  const [isLoading, setIsLoading] = useState(false);
  // const [searchWarehouse, setSearchWarehouse] = useState('');

  const fetchWarehouses = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/warehouses');
      const res = data.data;
      setWarehouses(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <Autocomplete
      id="warehouse-select"
      sx={{ width: 300, mt: 5 }}
      options={isLoading ? [{ name: 'loading...' }] : warehouses}
      autoHighlight
      getOptionLabel={(option) => option.name || ''}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      value={formik.values.warehouseDestination} // Assuming formik.values.warehouse represents the selected warehouse
      onChange={(e, value) => {
        formik.setFieldValue('warehouseDestination', value); // Update formik with the selected warehouse
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a Warehouse"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          // error={
          //   formik.touched.warehouseDestination &&
          //   Boolean(formik.errors.warehouseDestination)
          // }
          // helperText={
          //   formik.touched.warehouseDestination &&
          //   formik.errors.warehouseDestination
          // }
          // onChange={(e) => setSearchWarehouse(e.target.value)}
          // onClick={() => setSearchWarehouse('')}
        />
      )}
    />
  );
}

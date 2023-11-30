import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { HeaderModal } from './HeaderModal';
import WarehouseSelect from './WarehouseSelect';
import api from '../../../../constants/api';
import { setAlertActionCreator } from '../../../../states/alert/action';
import { asyncGetWarehouseAdmin } from '../../../../states/Administrator/action';

export function CreatedDialog({ isCreateDialogOpen, setIsCreateDialogOpen }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      warehouseDestination: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    enableReinitialize: true,
    onSubmit: async () => {
      try {
        setLoading(true);
        const whDestinationId = formik.values.warehouseDestination.id;
        const { email } = formik.values;
        const data = await api.post(
          `/warehouseusers/${whDestinationId}/users`,
          { email }
        );
        setIsCreateDialogOpen(false);
        dispatch(
          setAlertActionCreator({
            val: {
              status: 'success',
              message: 'success create new warehouse admin',
            },
          })
        );
        dispatch(asyncGetWarehouseAdmin());
        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: data.data.status },
          })
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
        dispatch(setAlertActionCreator({ err }));
      }
    },
  });
  function inputHandler(e, fieldName) {
    const { value } = e.target;
    formik.setFieldValue(fieldName, value);
  }

  return (
    <Dialog
      open={isCreateDialogOpen}
      onClose={() => {
        setIsCreateDialogOpen(false);
        formik.resetForm();
      }}
      sx={{ minWidth: '1000px', minHeight: 100 }}
    >
      <HeaderModal
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        formik={formik}
      />
      <DialogContent
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          mt: 2,
        }}
      >
        <Typography>Masukkan Email User</Typography>
        <TextField
          variant="outlined"
          size="medium"
          placeholder="example@gmail.com"
          onChange={(e) => inputHandler(e, 'email')}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email ? formik.errors.email : ''}
        />
        <Typography mt={3} mb={2}>
          Warehouse Tujuan
        </Typography>
        {/* Input Wh Destination */}
        <WarehouseSelect formik={formik} />
      </DialogContent>

      <hr
        style={{
          marginBottom: '0px',
          boxShadow: '0px 1px 2px rgba(0, 5, 3, 10)',
        }}
      />

      <DialogActions sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={formik.handleSubmit} disabled={loading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

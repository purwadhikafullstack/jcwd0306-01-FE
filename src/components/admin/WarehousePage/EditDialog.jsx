import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { number, object, string } from 'yup';
import { useDispatch } from 'react-redux';
import { asyncEditWarehouse } from '../../../states/warehouses/action';
import FormikOutlinedInput from '../../FormikOutlinedInput';

function EditDialog({ warehouse, isEditDialogOpen, setIsEditDialogOpen }) {
  const dispatch = useDispatch();

  const initialValues = {
    name: warehouse.name,
    country: warehouse.WarehouseAddress.country,
    provinceId: warehouse.WarehouseAddress.provinceId,
    cityId: warehouse.WarehouseAddress.cityId,
    district: warehouse.WarehouseAddress.district,
    village: warehouse.WarehouseAddress.village,
    detail: warehouse.WarehouseAddress.detail,
    longitude: warehouse.WarehouseAddress.longitude,
    latitude: warehouse.WarehouseAddress.latitude,
  };

  const validationSchema = object({
    name: string().required(),
    country: string().required(),
    provinceId: number().integer().min(1).required(),
    cityId: number().integer().min(1).required(),
    district: string().required(),
    village: string().required(),
    detail: string().required(),
    longitude: number().required(),
    latitude: number().required(),
  });

  const onSubmit = (values, { resetForm }) => {
    const data = {};
    Object.keys(initialValues).forEach((key) => {
      if (values[key] !== initialValues[key]) data[key] = values[key];
    });
    dispatch(asyncEditWarehouse(warehouse.id, data)).then((isSuccess) => {
      if (isSuccess) {
        resetForm();
        setIsEditDialogOpen(false);
      }
    });
  };

  return (
    <Dialog
      fullWidth
      open={isEditDialogOpen}
      onClose={() => setIsEditDialogOpen(false)}
    >
      <Formik
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
              Ubah Informasi Gudang
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} py={2}>
                <FormikOutlinedInput name="name" label="Nama" />
                <FormikOutlinedInput
                  name="country"
                  label="Negara"
                  inputProps={{ disabled: true }}
                />
                <FormikOutlinedInput
                  name="provinceId"
                  label="Provinsi"
                  inputProps={{ type: 'number', disabled: true }}
                />
                <FormikOutlinedInput
                  name="cityId"
                  label="Kota / Kabupaten"
                  inputProps={{ type: 'number', disabled: true }}
                />
                <FormikOutlinedInput name="district" label="Kecamatan" />
                <FormikOutlinedInput name="village" label="Kelurahan / Desa" />
                <FormikOutlinedInput
                  name="detail"
                  label="Alamat detail"
                  inputProps={{ multiline: true, rows: 4 }}
                />
                <FormikOutlinedInput
                  name="longitude"
                  label="Longitude"
                  inputProps={{ type: 'number' }}
                />
                <FormikOutlinedInput
                  name="latitude"
                  label="Latitude"
                  inputProps={{ type: 'number' }}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button
                onClick={() => setIsEditDialogOpen(false)}
                variant="outlined"
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!formik.isValid || !formik.dirty}
              >
                Simpan
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default EditDialog;

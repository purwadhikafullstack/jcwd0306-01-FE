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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncEditWarehouse } from '../../../states/warehouses/action';
import FormikOutlinedInput from '../../FormikOutlinedInput';
import { asyncGetProvinces } from '../../../states/provinces/action';
import FormikSelect from '../../FormikSelect';
import FormikSelectCity from './FormikSelectCity';

function EditDialog({ warehouse, isEditDialogOpen, setIsEditDialogOpen }) {
  const provinces = useSelector((states) => states.provinces);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetProvinces());
  }, []);

  const initialValues = {
    name: warehouse.name,
    country: warehouse.WarehouseAddress.country,
    provinceId: warehouse.WarehouseAddress.provinceId,
    cityId: warehouse.WarehouseAddress.cityId,
    district: warehouse.WarehouseAddress.district,
    village: warehouse.WarehouseAddress.village,
    detail: warehouse.WarehouseAddress.detail,
  };

  const validationSchema = object({
    name: string().required(),
    country: string().required(),
    provinceId: number().integer().min(1).required(),
    cityId: number().integer().min(1).required(),
    district: string().required(),
    village: string().required(),
    detail: string().required(),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(asyncEditWarehouse(warehouse.id, values)).then((isSuccess) => {
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
                <FormikSelect
                  name="provinceId"
                  label="Provinsi"
                  values={provinces}
                  itemValueName="id"
                  itemValueLabel="name"
                />
                <FormikSelectCity />
                <FormikOutlinedInput name="district" label="Kecamatan" />
                <FormikOutlinedInput name="village" label="Kelurahan / Desa" />
                <FormikOutlinedInput
                  name="detail"
                  label="Alamat detail"
                  inputProps={{ multiline: true, rows: 4 }}
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

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { number, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncCreateWarehouse } from '../../../states/warehouses/action';
import FormikOutlinedInput from '../../FormikOutlinedInput';
import { asyncGetProvinces } from '../../../states/provinces/action';
import FormikSelect from '../../FormikSelect';
import FormikSelectCity from './FormikSelectCity';
import useSwal from '../../../hooks/useSwal';

function CreateDialog({ isCreateDialogOpen, setIsCreateDialogOpen }) {
  const provinces = useSelector((states) => states.provinces);
  const dispatch = useDispatch();
  const Swal = useSwal();

  useEffect(() => {
    dispatch(asyncGetProvinces());
  }, []);

  const initialValues = {
    name: '',
    country: 'Indonesia',
    provinceId: 1,
    cityId: 1,
    district: '',
    village: '',
    detail: '',
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

  const onSubmit = async (values, { resetForm }) => {
    await Swal.fire({
      icon: 'warning',
      title: (
        <Typography>
          Gudang
          <Typography
            component="span"
            sx={{ fontWeight: 600, '&::before, &::after': { content: '" "' } }}
          >
            {values.name}
          </Typography>
          akan ditambahkan
        </Typography>
      ),
      showDenyButton: true,
      denyButtonText: 'Batalkan',
      showConfirmButton: true,
      confirmButtonText: 'Konfirmasi',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const isSuccess = await dispatch(asyncCreateWarehouse(values));
        if (isSuccess) {
          resetForm();
          setIsCreateDialogOpen(false);
        }
      },
    });
  };

  return (
    <Dialog
      fullWidth
      open={isCreateDialogOpen}
      onClose={() => setIsCreateDialogOpen(false)}
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
              Masukan Informasi Gudang
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} py={2}>
                <FormikOutlinedInput name="name" label="Nama" />
                <FormikOutlinedInput
                  name="country"
                  label="Negara"
                  inputProps={{ readOnly: true }}
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
                type="submit"
                variant="contained"
                disabled={!formik.isValid || !formik.dirty}
              >
                Simpan
              </Button>
              <Button
                onClick={() => setIsCreateDialogOpen(false)}
                variant="contained"
                color="error"
              >
                Batal
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default CreateDialog;

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
import { mixed, object, string } from 'yup';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { bool, func } from 'prop-types';
import { useMemo } from 'react';
import FormikOutlinedInput from '../../FormikOutlinedInput';
import {
  asyncCreateCategory,
  asyncGetCategories,
} from '../../../states/categories/action';
import ImageInput from './ImageInput';
import useSwal from '../../../hooks/useSwal';

function CreateDialog({ isCreateDialogOpen, setIsCreateDialogOpen }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const Swal = useSwal();

  const initialValues = useMemo(
    () => ({
      name: '',
      image: null,
      imageURL: '',
    }),
    []
  );

  const validationSchema = useMemo(
    () =>
      object({
        name: string().required(),
        image: mixed()
          .required()
          .test(
            'is-file',
            'Image must be a file',
            (value) => value instanceof File
          )
          .test('is-image', 'File must be an image', (value) =>
            value.type.startsWith('image/')
          )
          .test(
            'file-size',
            'File size must be ≤ 1MB',
            (value) => value.size <= 1024 * 1024 // 1MB = 1024 * 1024 bytes
          ),
      }),
    []
  );

  const onSubmit = async (values, { resetForm }) => {
    await Swal.fire({
      icon: 'question',
      title: (
        <Typography>
          Kategori
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
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('image', values.image);
        const isSuccess = await dispatch(asyncCreateCategory(formData));
        if (isSuccess) {
          await dispatch(
            asyncGetCategories({
              search: searchParams.get('search'),
              sortBy: searchParams.get('sortBy'),
              orderBy: searchParams.get('orderBy'),
              pagination: true,
              page: searchParams.get('page'),
              perPage: searchParams.get('perPage'),
            })
          );
          URL.revokeObjectURL(values.imageURL);
          resetForm();
          setIsCreateDialogOpen(false);
        }
      },
    });
  };

  return (
    <Dialog fullWidth open={isCreateDialogOpen}>
      <Formik
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
              Masukan Data Kategori
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} py={2}>
                <FormikOutlinedInput name="name" label="Nama" />
                <ImageInput />
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

CreateDialog.propTypes = {
  isCreateDialogOpen: bool.isRequired,
  setIsCreateDialogOpen: func.isRequired,
};

export default CreateDialog;

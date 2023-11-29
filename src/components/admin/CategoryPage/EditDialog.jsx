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
import { mixed, object, string as str } from 'yup';
import { useDispatch } from 'react-redux';
import { bool, func, number, shape, string } from 'prop-types';
import { useMemo } from 'react';
import FormikOutlinedInput from '../../FormikOutlinedInput';
import { asyncEditCategory } from '../../../states/categories/action';
import ImageInput from './ImageInput';
import useSwal from '../../../hooks/useSwal';

function EditDialog({ category, isEditDialogOpen, setIsEditDialogOpen }) {
  const dispatch = useDispatch();
  const Swal = useSwal();

  const initialValues = useMemo(
    () => ({
      name: category.name || '',
      image: null,
      imageURL: category.id
        ? `${import.meta.env.VITE_API_BASE_URL}/categories/${category.id}/image`
        : '',
    }),
    [category]
  );

  const validationSchema = useMemo(
    () =>
      object({
        name: str().required(),
        image: mixed()
          .nullable()
          .test('is-file', 'Image must be a file', (value) => {
            if (!value) return true;
            return value instanceof File;
          })
          .test('is-image', 'File must be an image', (value) => {
            if (!value) return true;
            return value.type.startsWith('image/');
          })
          .test('file-size', 'File size must be ≤ 1MB', (value) => {
            if (!value) return true;
            return value.size <= 1024 * 1024; // 1MB = 1024 * 1024 bytes
          }),
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
            {category.name}
          </Typography>
          akan diubah
        </Typography>
      ),
      showDenyButton: true,
      denyButtonText: 'Batalkan',
      showConfirmButton: true,
      confirmButtonText: 'Konfirmasi',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const formData = new FormData();
        if (values.name !== category.name) formData.append('name', values.name);
        if (values.image) formData.append('image', values.image);
        const isSuccess = await dispatch(
          asyncEditCategory({ categoryId: category.id, formData })
        );
        if (isSuccess) {
          URL.revokeObjectURL(values.imageURL);
          resetForm();
          setIsEditDialogOpen(false);
        }
      },
    });
  };

  return (
    <Dialog fullWidth open={isEditDialogOpen}>
      <Formik
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
              Ubah Data Kategori
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
                onClick={() => setIsEditDialogOpen(false)}
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

EditDialog.propTypes = {
  category: shape({
    id: number,
    name: string,
  }).isRequired,
  isEditDialogOpen: bool.isRequired,
  setIsEditDialogOpen: func.isRequired,
};

export default EditDialog;

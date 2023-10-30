import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { mixed, object, string as str } from 'yup';
import { useDispatch } from 'react-redux';
import { bool, func, number, shape, string } from 'prop-types';
import FormikOutlinedInput from '../../FormikOutlinedInput';
import { asyncEditCategory } from '../../../states/categories/action';
import ImageInput from './ImageInput';

function EditDialog({ category, isEditDialogOpen, setIsEditDialogOpen }) {
  const dispatch = useDispatch();

  const initialValues = {
    name: category.name || '',
    image: null,
    imageURL: category.id
      ? `${import.meta.env.VITE_API_BASE_URL}/categories/${category.id}/image`
      : '',
  };

  const validationSchema = object({
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
  });

  const onSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    if (values.name !== category.name) formData.append('name', values.name);
    if (values.image) formData.append('image', values.image);
    dispatch(asyncEditCategory({ categoryId: category.id, formData })).then(
      (isSuccess) => {
        if (isSuccess) {
          URL.revokeObjectURL(values.imageURL);
          resetForm();
          setIsEditDialogOpen(false);
        }
      }
    );
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

EditDialog.propTypes = {
  category: shape({
    id: number,
    name: string,
  }).isRequired,
  isEditDialogOpen: bool.isRequired,
  setIsEditDialogOpen: func.isRequired,
};

export default EditDialog;

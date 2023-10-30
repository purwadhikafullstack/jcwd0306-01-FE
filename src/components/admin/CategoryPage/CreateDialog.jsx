import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { mixed, object, string } from 'yup';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { bool, func } from 'prop-types';
import FormikOutlinedInput from '../../FormikOutlinedInput';
import {
  asyncCreateCategory,
  asyncGetCategories,
} from '../../../states/categories/action';
import ImageInput from './ImageInput';

function CreateDialog({ isCreateDialogOpen, setIsCreateDialogOpen }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const initialValues = {
    name: '',
    image: null,
    imageURL: '',
  };

  const validationSchema = object({
    name: string().required(),
    image: mixed()
      .required()
      .test('is-file', 'Image must be a file', (value) => value instanceof File)
      .test('is-image', 'File must be an image', (value) =>
        value.type.startsWith('image/')
      )
      .test(
        'file-size',
        'File size must be ≤ 1MB',
        (value) => value.size <= 1024 * 1024 // 1MB = 1024 * 1024 bytes
      ),
  });

  const onSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('image', values.image);
    dispatch(asyncCreateCategory(formData)).then((isSuccess) => {
      if (isSuccess) {
        dispatch(asyncGetCategories({ name: searchParams.get('name') }));
        URL.revokeObjectURL(values.imageURL);
        resetForm();
        setIsCreateDialogOpen(false);
      }
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
                onClick={() => setIsCreateDialogOpen(false)}
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

CreateDialog.propTypes = {
  isCreateDialogOpen: bool.isRequired,
  setIsCreateDialogOpen: func.isRequired,
};

export default CreateDialog;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { mixed, number, object, string, array } from 'yup';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { bool, func } from 'prop-types';
import FormikOutlinedInput from '../../FormikOutlinedInput';
import ImageInput from './ImageInput';
import {
  asyncCreateProduct,
  asyncGetProducts,
} from '../../../states/products/action';
import CategoriesInput from './CategoriesInput';

function CreateDialog({ isCreateDialogOpen, setIsCreateDialogOpen }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const initialValues = {
    name: '',
    price: 0,
    weight: 0,
    discount: 0,
    description: '',
    categoryIds: [],
    images: [],
  };

  const validationSchema = object({
    name: string().required(),
    price: number().integer().min(0).required(),
    weight: number().min(0).required(),
    discount: number().min(0).max(1).required(),
    description: string().required(),
    categoryIds: array().of(number().integer().min(1)),
    images: array()
      .of(
        mixed()
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
          )
      )
      .required(),
  });

  const onSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('price', values.price);
    formData.append('weight', values.weight);
    formData.append('discount', values.discount);
    formData.append('description', values.description);
    formData.append('categoryIds', JSON.stringify(values.categoryIds));
    values.images.forEach((image) => {
      formData.append('images', image);
    });
    dispatch(asyncCreateProduct(formData)).then((isSuccess) => {
      if (isSuccess) {
        dispatch(
          asyncGetProducts({
            getType: 'REPLACE',
            name: searchParams.get('name'),
            categoryId: searchParams.get('categoryId'),
            sortBy: searchParams.get('sortBy'),
            paranoid: false,
            orderBy: searchParams.get('orderBy'),
            page: searchParams.get('page'),
            perPage: searchParams.get('perPage'),
          })
        );
        resetForm();
        setIsCreateDialogOpen(false);
      }
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
              Masukkan Data Produk
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} py={2}>
                <FormikOutlinedInput name="name" label="Nama" />
                <FormikOutlinedInput
                  name="price"
                  label="Harga"
                  inputProps={{
                    type: 'number',
                    inputProps: { min: 0, step: 1 },
                    startAdornment: (
                      <InputAdornment position="start">Rp</InputAdornment>
                    ),
                  }}
                />
                <FormikOutlinedInput
                  name="weight"
                  label="Berat"
                  inputProps={{
                    type: 'number',
                    inputProps: { min: 0 },
                    endAdornment: (
                      <InputAdornment position="end">gr</InputAdornment>
                    ),
                  }}
                />
                <FormikOutlinedInput
                  name="discount"
                  label="Diskon"
                  inputProps={{
                    type: 'number',
                    inputProps: { min: 0, max: 1, step: 0.01 },
                    endAdornment: (
                      <InputAdornment position="end">
                        {`≈ ${(formik.values.discount * 100).toFixed(2)}%`}
                      </InputAdornment>
                    ),
                  }}
                />
                <FormikOutlinedInput
                  name="description"
                  label="Deskripsi"
                  inputProps={{ multiline: true, rows: 10 }}
                />
                <ImageInput />
                <CategoriesInput />
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

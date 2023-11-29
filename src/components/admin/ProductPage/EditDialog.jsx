import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { array, mixed, object, number as num, string as str } from 'yup';
import { useDispatch } from 'react-redux';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { useMemo } from 'react';
import FormikOutlinedInput from '../../FormikOutlinedInput';
import ImageInput from './ImageInput';
import CategoriesInput from './CategoriesInput';
import { asyncEditProduct } from '../../../states/products/action';
import DeleteSavedImageField from './DeleteSavedImageField';
import FormikReactQuill from '../../FormikReactQuill';
import useSwal from '../../../hooks/useSwal';

function EditDialog({ product, isEditDialogOpen, setIsEditDialogOpen }) {
  const dispatch = useDispatch();
  const Swal = useSwal();

  const initialValues = useMemo(
    () => ({
      name: product.name,
      price: product.price,
      weight: product.weight,
      discount: product.discount,
      description: product.description,
      categoryIds: product.Categories?.map((val) => val.id),
      images: [],
      imageIdsToDelete: [],
      savedImageIds: product.imageIds,
    }),
    [product]
  );

  const validationSchema = useMemo(
    () =>
      object({
        name: str().required(),
        price: num().integer().min(0).required(),
        weight: num().min(0).required(),
        discount: num().min(0).max(1).required(),
        description: str().required(),
        categoryIds: array().of(num().integer().min(1)),
        images: array().of(
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
        ),
        imageIdsToDelete: array().of(num().integer().min(1)),
      }),
    []
  );

  const onSubmit = async (values, { resetForm }) => {
    await Swal.fire({
      icon: 'warning',
      title: (
        <Typography>
          Produk
          <Typography
            component="span"
            sx={{ fontWeight: 600, '&::before, &::after': { content: '" "' } }}
          >
            {product.name}
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
        if (values.name !== product.name) formData.append('name', values.name);
        if (values.price !== product.price)
          formData.append('price', values.price);
        if (values.weight !== product.weight)
          formData.append('weight', values.weight);
        if (values.discount !== product.discount)
          formData.append('discount', values.discount);
        if (values.description !== product.description)
          formData.append('description', values.description);
        formData.append('categoryIds', JSON.stringify(values.categoryIds));
        if (values.images.length !== 0) {
          values.images.forEach((image) => {
            formData.append('images', image);
          });
        }
        if (values.imageIdsToDelete.length !== 0) {
          formData.append(
            'imageIdsToDelete',
            JSON.stringify(values.imageIdsToDelete)
          );
        }
        const isSuccess = await dispatch(
          asyncEditProduct(product.id, formData)
        );
        if (isSuccess) {
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
              Ubah Data Produk
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
                        {`≈ ${new Intl.NumberFormat('id-ID', {
                          style: 'percent',
                        }).format(formik.values.discount)}`}
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ '& .ql-tooltip': { position: 'sticky' } }}>
                  <FormikReactQuill name="description" label="Deskripsi" />
                </Box>
                <ImageInput />
                <DeleteSavedImageField />
                <CategoriesInput />
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
  product: shape({
    id: number,
    name: string,
    price: number,
    weight: number,
    discount: number,
    description: string,
    Categories: arrayOf(shape({ id: number, name: string })),
    imageIds: arrayOf(number),
  }).isRequired,
  isEditDialogOpen: bool.isRequired,
  setIsEditDialogOpen: func.isRequired,
};

export default EditDialog;

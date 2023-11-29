import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { bool, func, number } from 'prop-types';
import { object, number as num } from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import FormikOutlinedInput from '../../../FormikOutlinedInput';
import WarehouseSelect from './WarehouseSelect';
import {
  asyncCreateStockMutation,
  asyncGetStockMutations,
} from '../../../../states/stockMutations/action';
import { asyncGetProduct } from '../../../../states/product/action';

function CreateStockMutationDialog({
  productId,
  isCreateStockMutationDialogOpen,
  setIsCreateStockMutationDialogOpen,
}) {
  const product = useSelector((states) => states.product);
  const dispatch = useDispatch();
  const { warehouseId } = useParams();
  const [searchParams] = useSearchParams();
  const [toWarehouseProduct, setToWarehouseProduct] = useState(null);
  const [fromWarehouseProduct, setfromWarehouseProduct] = useState(null);

  useEffect(() => {
    dispatch(asyncGetProduct(productId));
  }, [productId]);

  useEffect(() => {
    if (product !== null) {
      setToWarehouseProduct(
        product.WarehouseProducts.find(
          (val) => val.warehouseId === Number(warehouseId)
        )
      );
    }
  }, [product]);

  const initialValues = useMemo(
    () => ({ quantity: 0, fromWarehouseId: null }),
    []
  );

  const validationSchema = useMemo(() => {
    if (fromWarehouseProduct !== null)
      return object({
        quantity: num()
          .integer()
          .min(1)
          .max(fromWarehouseProduct.stock)
          .required(),
      });
    return null;
  }, [fromWarehouseProduct]);

  const onSubmit = (values, { resetForm }) => {
    dispatch(
      asyncCreateStockMutation({
        type: 'request',
        productId: product.id,
        fromWarehouseId: values.fromWarehouseId,
        toWarehouseId: toWarehouseProduct.warehouseId,
        quantity: values.quantity,
      })
    ).then((isSuccess) => {
      if (isSuccess) {
        resetForm();
        setIsCreateStockMutationDialogOpen(false);
        dispatch(
          asyncGetStockMutations({
            search: searchParams.get('search'),
            status: searchParams.get('status'),
            type: searchParams.get('type'),
            sortBy: searchParams.get('sortBy'),
            orderBy: searchParams.get('orderBy'),
            page: searchParams.get('page'),
            perPage: searchParams.get('perPage'),
            warehouseId,
          })
        );
      }
    });
  };

  if (toWarehouseProduct === null) return null;

  return (
    <Dialog fullWidth open={isCreateStockMutationDialogOpen}>
      <Formik
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
              Ajukan Mutasi Stok
            </DialogTitle>
            <DialogContent>
              <Typography p={2} fontWeight={600}>
                {product.name}
              </Typography>
              <Stack spacing={2} py={2}>
                {/* from warehouse */}
                <WarehouseSelect
                  setfromWarehouseProduct={setfromWarehouseProduct}
                />

                {/* Quantity input */}
                <FormikOutlinedInput
                  name="quantity"
                  label="Total stok"
                  inputProps={{
                    type: 'number',
                    inputProps: {
                      max: fromWarehouseProduct?.stock || 1,
                      min: 1,
                      step: 1,
                    },
                    startAdornment: (
                      <InputAdornment position="start">📦</InputAdornment>
                    ),
                  }}
                />

                <Divider sx={{ borderWidth: '0.2rem', borderRadius: '5rem' }} />

                {/* to warehouse */}
                <TextField
                  select
                  label="Gudang Tujuan"
                  size="small"
                  value={0}
                  SelectProps={{
                    IconComponent: 'span',
                    readOnly: true,
                  }}
                >
                  <MenuItem value={0}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip label={`Stok: ${toWarehouseProduct.stock}`} />
                      <Typography>{`${toWarehouseProduct.name}, ${toWarehouseProduct.city}`}</Typography>
                    </Stack>
                  </MenuItem>
                </TextField>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button
                onClick={() => setIsCreateStockMutationDialogOpen(false)}
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

CreateStockMutationDialog.propTypes = {
  productId: number.isRequired,
  isCreateStockMutationDialogOpen: bool.isRequired,
  setIsCreateStockMutationDialogOpen: func.isRequired,
};

export default CreateStockMutationDialog;

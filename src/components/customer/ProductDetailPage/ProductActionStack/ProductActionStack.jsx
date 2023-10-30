import { Divider, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { number, string, object } from 'yup';
import ChatButton from './ChatButton';
import ShareButton from './ShareButton';
import AddToCartButton from './AddToCartButton';
import DirectBuyButton from './DirectBuyButton';
import QuantityInput from './QuantityInput';
import NoteInput from './NoteInput';
import { createCart } from '../../../../states/cart/action';

function ProductActionStack() {
  const product = useSelector((states) => states.product);
  const dispatch = useDispatch();
  const [stackTop, setStackTop] = useState(null);

  const stackRef = useCallback((node) => {
    if (node !== null) {
      const getTop = () => {
        // this function is used to measure the distance from top of an element to the top of body
        let tempNode = node;
        let yPosition = 0;
        while (tempNode) {
          yPosition += tempNode.offsetTop;
          tempNode = tempNode.offsetParent;
        }
        return yPosition;
      };
      setStackTop(getTop());
    }
  }, []);

  const initialValues = { quantity: 1, note: '', submitButton: '' };
  const validationSchema = object({
    quantity: number().integer().min(1).max(product.stock).required(),
    note: string(),
  });
  const onSubmit = (values, { resetForm }) => {
    if (values.submitButton === 'add-to-cart') {
      dispatch(
        createCart({
          productId: product.id,
          quantity: values.quantity,
          note: values.note,
        })
      ).then((isSuccess) => {
        if (isSuccess) resetForm();
      });
    } else {
      console.log(values);
      // dispatch(
      //   asyncDirectBuy({
      //     id: product.id,
      //     quantity: values.quantity,
      //     note: values.note,
      //   })
      // ).then((isSuccess) => {
      //   if (isSuccess) resetForm();
      // });
    }
  };

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form style={{ width: '100%', height: '100%' }}>
          <Stack
            ref={stackRef}
            spacing={3}
            sx={{
              p: '1rem',
              mx: 'auto',
              position: 'sticky',
              top: `${stackTop}px`,
              maxWidth: '20rem',
              border: 'solid 0.05rem',
              borderRadius: 1,
              borderColor: 'text.disabled',
            }}
          >
            {/* Title */}
            <Typography fontWeight={700}>Atur jumlah dan catatan</Typography>

            <Stack spacing={1}>
              {/* Quanitity input */}
              <QuantityInput />

              {/* Note input */}
              <NoteInput />
            </Stack>

            {/* Divider */}
            <Divider sx={{ height: '0.1rem', bgcolor: 'divider' }} />

            <Stack>
              {/* Total price without discount */}
              {product.discount > 0 && (
                <Typography
                  component="del"
                  variant="subtitle2"
                  sx={{ alignSelf: 'end', color: 'text.disabled' }}
                >
                  Rp
                  {(formik.values.quantity * product.price).toLocaleString(
                    'id-ID'
                  )}
                </Typography>
              )}

              {/* Total price with discount */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Subtotal
                </Typography>
                <Typography fontSize="1.1rem" fontWeight={700}>
                  Rp
                  {(
                    formik.values.quantity *
                    product.price *
                    (1 - product.discount)
                  ).toLocaleString('id-ID')}
                </Typography>
              </Stack>
            </Stack>

            {/* Submit button */}
            <Stack spacing={1}>
              <AddToCartButton />
              <DirectBuyButton />
            </Stack>

            {/* Sub actions */}
            <Stack direction="row" spacing={1}>
              <ChatButton />
              <Divider
                flexItem
                orientation="vertical"
                sx={{ width: '0.1rem', bgcolor: 'divider' }}
              />
              <ShareButton />
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default ProductActionStack;

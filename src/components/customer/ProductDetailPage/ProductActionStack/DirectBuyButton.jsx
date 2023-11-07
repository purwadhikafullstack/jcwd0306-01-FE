import { Button } from '@mui/material';
import { Field } from 'formik';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function DirectBuyButton() {
  const product = useSelector((states) => states.product);
  const userSelector = useSelector((states) => states.authUser);
  const nav = useNavigate();
  return (
    <Field name="submitButton">
      {({ field, form }) => (
        <Button
          onClick={async ({ target }) => {
            await form.setFieldValue(field.name, target.value);
            nav(`/cart/shipment`, {
              state: {
                productId: product?.id,
                quantity: form.values.quantity,
                note: form.values.note,
                userId: userSelector?.id,
                isChecked: 1,
                Product: {
                  ...product,
                  ProductImages: [{ id: product?.imageIds[0] }],
                },
              },
            });
          }}
          disabled={!form.isValid}
          type="submit"
          name={field.name}
          value="direct-buy"
          variant="outlined"
          sx={{ textTransform: 'none' }}
        >
          Beli Langsung
        </Button>
      )}
    </Field>
  );
}

export default DirectBuyButton;

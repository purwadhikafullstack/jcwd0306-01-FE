import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Field } from 'formik';
import { useSelector } from 'react-redux';

function AddToCartButton() {
  const product = useSelector((states) => states.product);

  return (
    <Field name="submitButton">
      {({ field, form }) => (
        <Button
          onClick={async ({ target }) => {
            await form.setFieldValue(field.name, target.value);
          }}
          disabled={!form.isValid || product.stock === 0}
          type="submit"
          name={field.name}
          value="add-to-cart"
          startIcon={<AddOutlined />}
          variant="contained"
          sx={{ textTransform: 'none' }}
        >
          Keranjang
        </Button>
      )}
    </Field>
  );
}

export default AddToCartButton;

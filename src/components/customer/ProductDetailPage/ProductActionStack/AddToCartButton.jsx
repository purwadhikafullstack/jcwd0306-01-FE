import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Field } from 'formik';

function AddToCartButton() {
  return (
    <Field name="submitButton">
      {({ field, form }) => (
        <Button
          onClick={async ({ target }) => {
            await form.setFieldValue(field.name, target.value);
          }}
          disabled={!form.isValid}
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

import { Button } from '@mui/material';
import { Field } from 'formik';
import { useSelector } from 'react-redux';

function DirectBuyButton() {
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

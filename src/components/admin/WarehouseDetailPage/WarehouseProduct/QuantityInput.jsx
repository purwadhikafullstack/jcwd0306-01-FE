import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  Stack,
} from '@mui/material';
import { Field } from 'formik';
import { number, shape } from 'prop-types';

function QuantityInput({ warehouseProduct }) {
  return (
    <Field name="quantity">
      {({ field, form, meta }) => (
        <FormControl required error={meta.touched && !!meta.error}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1.5}
          >
            {/* Quantity input */}
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                border: 'solid 0.05rem',
                borderColor: 'primary.main',
                borderRadius: 1,
                '& *': { fontSize: '1rem' },
                '& > button': {
                  width: 'fit-content',
                  height: 'fit-content',
                },
              }}
            >
              <IconButton
                color="primary"
                onClick={async () => {
                  await form.setFieldValue(field.name, field.value - 1);
                }}
                disabled={field.value <= warehouseProduct.stock * -1}
              >
                <RemoveOutlined />
              </IconButton>
              <Input
                type="number"
                disableUnderline
                inputProps={{
                  min: field.value <= warehouseProduct.stock * -1,
                  step: 1,
                  style: { textAlign: 'center' },
                }}
                sx={{ width: '5rem' }}
                aria-describedby="quantity_helper-text"
                {...field}
              />
              <IconButton
                color="primary"
                onClick={async () => {
                  await form.setFieldValue(field.name, field.value + 1);
                }}
              >
                <AddOutlined />
              </IconButton>
            </Stack>
          </Stack>

          {/* Helper text */}
          <FormHelperText
            id="quantity_helper-text"
            sx={{ color: 'error.main', textAlign: 'center' }}
          >
            {meta.error}
          </FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}

QuantityInput.propTypes = {
  warehouseProduct: shape({ stock: number.isRequired }).isRequired,
};

export default QuantityInput;

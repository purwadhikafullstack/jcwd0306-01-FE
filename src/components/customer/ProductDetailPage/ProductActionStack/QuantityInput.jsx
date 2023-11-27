import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  Stack,
  Typography,
} from '@mui/material';
import { Field } from 'formik';
import { useSelector } from 'react-redux';

function QuantityInput() {
  const product = useSelector((states) => states.product);

  return (
    <Field name="quantity">
      {({ field, form, meta }) => (
        <FormControl required error={!!meta.error}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            {/* Quantity input */}
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                border: 'solid 0.05rem',
                borderColor: 'primary.main',
                borderRadius: 1,
                '& *': { fontSize: '1rem' },
                '& > button': { width: 'fit-content', height: 'fit-content' },
              }}
            >
              <IconButton
                color="primary"
                onClick={async () => {
                  await form.setFieldValue(field.name, field.value - 1);
                }}
                disabled={field.value <= 1}
              >
                <RemoveOutlined />
              </IconButton>
              <Input
                type="number"
                disableUnderline
                inputProps={{
                  min: 1,
                  step: 1,
                  style: { textAlign: 'center' },
                }}
                sx={{ width: '2.5rem' }}
                aria-describedby="quantity_helper-text"
                {...field}
              />
              <IconButton
                color="primary"
                onClick={async () => {
                  await form.setFieldValue(field.name, field.value + 1);
                }}
                disabled={field.value >= product.stock}
              >
                <AddOutlined />
              </IconButton>
            </Stack>

            {/* Stock */}
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle2">Stok:</Typography>
              <Typography variant="subtitle2" fontWeight={600}>
                {product.stock}
              </Typography>
            </Stack>
          </Stack>

          {/* Helper text */}
          <FormHelperText
            id="quantity_helper-text"
            sx={{ color: 'error.main' }}
          >
            {meta.error}
          </FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}

export default QuantityInput;

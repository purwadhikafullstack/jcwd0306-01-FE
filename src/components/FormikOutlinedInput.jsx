import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Field } from 'formik';
import { shape, string } from 'prop-types';

function FormikOutlinedInput({ name, label, inputProps }) {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormControl
          fullWidth
          required
          size="small"
          variant="outlined"
          error={meta.touched && !!meta.error}
        >
          <InputLabel htmlFor={`${name}_input`}>{label}</InputLabel>
          <OutlinedInput
            id={`${name}_input`}
            type="text"
            label={label}
            inputProps={{ 'aria-label': label }}
            aria-describedby={`${name}_helper-text`}
            {...field}
            {...inputProps}
          />
          <FormHelperText id={`${name}_helper-text`}>
            {meta.touched && meta.error}
          </FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}

FormikOutlinedInput.defaultProps = {
  inputProps: {},
};

FormikOutlinedInput.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  inputProps: shape({}),
};

export default FormikOutlinedInput;

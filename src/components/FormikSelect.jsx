import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Field } from 'formik';

function FormikSelect({
  name,
  label,
  values,
  itemValueName,
  itemValueLabel,
  selectProps,
}) {
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
          <InputLabel id={`${name}_select-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}_select-label`}
            id={`${name}_select`}
            label={label}
            inputProps={{ 'aria-label': label }}
            aria-describedby={`${name}_helper-text`}
            MenuProps={{ PaperProps: { sx: { maxHeight: '30vh' } } }}
            variant="outlined"
            {...selectProps}
            {...field}
            value={
              values.some((value) => value[itemValueName] === field.value)
                ? field.value
                : ''
            }
          >
            {values.map((value) => (
              <MenuItem key={value[itemValueName]} value={value[itemValueName]}>
                {value[itemValueLabel]}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText id={`${name}_helper-text`}>
            {meta.touched && meta.error}
          </FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}

export default FormikSelect;

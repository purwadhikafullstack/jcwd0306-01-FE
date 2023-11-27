import { Avatar, FormControl, FormHelperText, FormLabel } from '@mui/material';
import { Field } from 'formik';

function ImageInput() {
  return (
    <Field name="image">
      {({ form, meta }) => (
        <FormControl
          fullWidth
          required
          variant="outlined"
          error={meta.touched && !!meta.error}
        >
          <FormLabel htmlFor="image_input">Gambar Kategori</FormLabel>
          <Avatar
            component="label"
            htmlFor="image_input"
            src={form.values.imageURL}
            alt={meta.value?.name}
            variant="square"
            sx={{
              width: '10rem',
              height: '10rem',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 },
            }}
          />
          <input
            hidden
            id="image_input"
            type="file"
            accept="image/*"
            aria-label="Category image"
            aria-describedby="image_helper-text"
            onChange={async ({ target }) => {
              await form.setFieldValue('image', target.files[0] || null); // Set image
              URL.revokeObjectURL(form.values.imageURL); // Release the object URL when no longer needed to free up resources
              await form.setFieldValue(
                'imageURL', // imageURL for image preview
                target.files[0]
                  ? URL.createObjectURL(target.files[0])
                  : form.initialValues.imageURL
              ); // Set imageURL
              await form.setFieldTouched('image', true);
            }}
          />
          <FormHelperText id="image_helper-text">
            {meta.touched && meta.error}
          </FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}

export default ImageInput;

import { FormControl, FormHelperText, Typography } from '@mui/material';
import { Field } from 'formik';
import { shape, string } from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import { mixed } from 'yup';
import { setAlertActionCreator } from '../states/alert/action';
import 'react-quill/dist/quill.snow.css';

function FormikReactQuill({ name, label, reactQuillProps }) {
  const dispatch = useDispatch();
  const reactQuillRef = useRef(); // Create a ref to store the ReactQuill component

  const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute(
      'accept',
      'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
    );
    input.click();

    input.onchange = async () => {
      try {
        const file = input.files[0];

        // validate file
        const schema = mixed()
          .test('is-image', 'File must be an image', (value) =>
            value.type.startsWith('image/')
          )
          .test(
            'file-size',
            'Image size must be ≤ 512KB',
            (value) => value.size <= (1024 * 1024) / 2
          );
        await schema.validate(file);

        // If file size is valid, handle the upload
        const editor = reactQuillRef.current.getEditor();
        const range = editor.getSelection();
        const reader = new FileReader();

        reader.onload = () => {
          editor.insertEmbed(range.index, 'image', reader.result);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        dispatch(setAlertActionCreator({ err }));
      }
    };
  };

  useEffect(() => {
    const quill = reactQuillRef.current.getEditor(); // Obtain Quill instance
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', selectLocalImage);
  }, []);

  const toolbarOptions = useMemo(
    () => [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['link', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean'], // remove formatting button
    ],
    []
  );

  return (
    <Field name={name}>
      {({ form, field, meta }) => (
        <FormControl
          fullWidth
          required
          size="small"
          variant="outlined"
          error={meta.touched && !!meta.error}
        >
          <Typography
            component="label"
            htmlFor={`${name}_input`}
            color={meta.touched && !!meta.error ? 'error' : 'text'}
            sx={{ '&::after': { content: '" *"' } }}
          >
            {label}
          </Typography>
          <ReactQuill
            ref={reactQuillRef}
            id={`${name}_input`}
            theme="snow"
            modules={{ toolbar: toolbarOptions }}
            value={field.value}
            onBlur={async () => {
              await form.setFieldTouched(field.name, true);
            }}
            onChange={async (newValue) => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(newValue, 'text/html');
              const text = doc.body.textContent;
              if (text || newValue.includes('img'))
                await form.setFieldValue(field.name, newValue);
              else await form.setFieldValue(field.name, '');
            }}
            {...reactQuillProps}
          />
          <FormHelperText>{meta.touched && meta.error}</FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}

FormikReactQuill.defaultProps = {
  reactQuillProps: {},
};

FormikReactQuill.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  reactQuillProps: shape({}),
};

export default FormikReactQuill;

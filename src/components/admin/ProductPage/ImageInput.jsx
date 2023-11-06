import { CancelRounded, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  ImageList,
  ImageListItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { FieldArray, useFormikContext } from 'formik';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { setAlertActionCreator } from '../../../states/alert/action';

function ImageInput() {
  const dispatch = useDispatch();
  const { values, setFieldValue, setFieldTouched } = useFormikContext();
  const onDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        await setFieldValue('images', [
          ...values.images,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
        await setFieldTouched('images', true);
      }
      if (rejectedFiles?.length) {
        dispatch(
          setAlertActionCreator({
            val: {
              status: 'error',
              message: `Gambar dibatalkan otomatis:
              ${rejectedFiles
                .map(
                  ({ errors, file }) =>
                    `${file.name} [${errors.map((err) => err.code).join(',')}]`
                )
                .join(' | ')}`,
            },
          })
        );
      }
    },
    [values.images]
  );
  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: 1024 * 1024,
  });

  return (
    <FieldArray name="images">
      {({ form, name, remove }) => (
        <FormControl
          fullWidth
          required
          variant="outlined"
          error={form.touched[name] && !!form.errors[name]}
        >
          <FormLabel htmlFor="image_input">Gambar produk</FormLabel>
          <Box
            {...getRootProps({
              sx: {
                cursor: 'pointer',
                py: '5rem',
                textAlign: 'center',
                borderWidth: 2,
                borderRadius: 1,
                borderColor: 'text.disabled',
                borderStyle: 'dashed',
                backgroundColor: 'action.selected',
                color: 'text.secondary',
                '&:hover': { borderColor: 'primary.main' },
                ...((isFocused || isDragActive) && {
                  borderColor: 'primary.main',
                }),
              },
            })}
          >
            <input
              {...getInputProps({
                id: 'image_input',
                'aria-label': 'Product images',
                'aria-describedby': 'image_helper-text',
              })}
            />
            {isDragActive ? (
              <Typography>Seret file ke sini</Typography>
            ) : (
              <Typography>
                Seret file ke sini atau klik untuk memilih file (max: 1MB)
              </Typography>
            )}
          </Box>
          <FormHelperText id="image_helper-text">
            {form.touched[name] && form.errors[name]}
          </FormHelperText>

          {/* New Image Preview */}
          {form.values[name].length !== 0 && (
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                Gambar terbaru
              </AccordionSummary>
              <AccordionDetails>
                <ImageList cols={4} sx={{ mt: '1rem' }}>
                  {form.values[name].map((image, idx) => (
                    <ImageListItem
                      key={image.preview}
                      sx={{ borderRadius: 1, overflow: 'hidden' }}
                    >
                      <Tooltip title="Batalkan gambar" arrow>
                        <IconButton
                          onClick={() => remove(idx)}
                          size="small"
                          color="error"
                          sx={{ position: 'absolute', right: 0 }}
                        >
                          <CancelRounded
                            sx={{
                              bgcolor: 'white',
                              borderRadius: 'inherit',
                              fontSize: '1.1rem',
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                      <img
                        onLoad={() => {
                          URL.revokeObjectURL(image.preview);
                        }}
                        src={image.preview}
                        alt={image.name}
                        style={{ aspectRatio: '1 / 1' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </AccordionDetails>
            </Accordion>
          )}
        </FormControl>
      )}
    </FieldArray>
  );
}

export default ImageInput;

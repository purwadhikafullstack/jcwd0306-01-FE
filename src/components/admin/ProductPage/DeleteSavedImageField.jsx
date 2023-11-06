import { CancelRounded, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormHelperText,
  IconButton,
  ImageList,
  ImageListItem,
  Tooltip,
} from '@mui/material';
import { FieldArray } from 'formik';

function DeleteSavedImageField() {
  return (
    <FieldArray name="imageIdsToDelete">
      {({ form, name, push }) => (
        <FormControl
          fullWidth
          required
          variant="outlined"
          error={form.touched[name] && !!form.errors[name]}
        >
          {/* Saved Image Preview */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              Gambar Tersimpan
            </AccordionSummary>
            <AccordionDetails>
              <ImageList cols={4} sx={{ mt: '1rem' }}>
                {form.values.savedImageIds.map((imageId) => (
                  <ImageListItem
                    key={imageId}
                    sx={{ borderRadius: 1, overflow: 'hidden' }}
                  >
                    <Tooltip title="Hapus gambar" arrow>
                      <IconButton
                        onClick={async () => {
                          await form.setFieldValue(
                            'savedImageIds',
                            form.values.savedImageIds.filter(
                              (id) => id !== imageId
                            )
                          );
                          push(imageId);
                          await form.setFieldTouched(name, true);
                        }}
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
                      src={`${
                        import.meta.env.VITE_API_BASE_URL
                      }/products/images/${imageId}`}
                      alt={`productImage-${imageId}`}
                      style={{ aspectRatio: '1 / 1' }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </AccordionDetails>
          </Accordion>
          <FormHelperText>
            {form.touched[name] && form.errors[name]}
          </FormHelperText>
        </FormControl>
      )}
    </FieldArray>
  );
}

export default DeleteSavedImageField;

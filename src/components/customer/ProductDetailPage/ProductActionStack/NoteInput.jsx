import { CreateOutlined } from '@mui/icons-material';
import { Button, OutlinedInput } from '@mui/material';
import { Field } from 'formik';
import { useState } from 'react';

function NoteInput() {
  const [isNoteActive, setIsNoteActive] = useState(false);

  return (
    <Field name="note">
      {({ field, form }) => (
        <>
          {/* Note input */}
          {isNoteActive && (
            <OutlinedInput
              size="small"
              placeholder="Contoh: Warna Putih"
              {...field}
            />
          )}

          {/* Note button */}
          {isNoteActive ? (
            <Button
              onClick={async () => {
                setIsNoteActive(false);
                await form.setFieldValue(field.name, '');
              }}
              size="small"
              sx={{
                width: 'fit-content',
                textTransform: 'none',
                fontSize: '0.8rem',
              }}
            >
              Batalkan Catatan
            </Button>
          ) : (
            <Button
              onClick={() => setIsNoteActive(true)}
              startIcon={<CreateOutlined />}
              size="small"
              sx={{
                width: 'fit-content',
                textTransform: 'none',
                fontSize: '0.8rem',
              }}
            >
              Tambah Catatan
            </Button>
          )}
        </>
      )}
    </Field>
  );
}

export default NoteInput;

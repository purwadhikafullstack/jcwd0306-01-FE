import { TextField } from '@mui/material';
import { useState } from 'react';

export function ProductNote({ product, note, setNote }) {
  const [display, setDisplay] = useState(false);
  return (
    <div style={{ fontSize: '0.9em' }}>
      {display ? (
        <TextField
          autoFocus
          margin="dense"
          id={`note-${product?.userId}-${product?.productId}`}
          name="product-note"
          label="Write a note"
          type="text"
          fullWidth
          variant="standard"
          value={note}
          sx={{ fontSize: '0.8em' }}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setDisplay(false);
          }}
          onBlur={() => setDisplay(false)}
        />
      ) : (
        <div className="d-flex gap-2">
          <div
            type="button"
            onClick={() => setDisplay(true)}
            style={{ color: '#009BD2' }}
          >
            {note ? 'Edit ' : 'Write a '}note:
          </div>
          <span className="text-break">{note}</span>
        </div>
      )}
    </div>
  );
}

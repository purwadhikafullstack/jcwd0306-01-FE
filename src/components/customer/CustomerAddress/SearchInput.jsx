import { SearchOutlined } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

export function SearchAddress({ isDesktop }) {
  return (
    <TextField
      // onChange={({ target }) => updateQueryParams({ name: target.value })}
      size="small"
      variant="outlined"
      placeholder={isDesktop ? 'Temukan Alamat' : 'cari'}
      // value={searchParams.get('name') || ''}
      sx={{
        // flexGrow: 1,
        width: isDesktop ? '20rem' : '7rem',
        '&:focus': {
          border: 'none',
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        ),
      }}
    />
  );
}

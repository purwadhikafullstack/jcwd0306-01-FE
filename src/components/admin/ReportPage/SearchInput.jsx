import { InputAdornment, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

function SearchInput() {
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  return (
    <TextField
      // onChange={({ target }) => updateQueryParams({ name: target.value })}
      size="small"
      variant="outlined"
      placeholder="Search"
      // value={searchParams.get('name') || ''}
      sx={{ flexGrow: 1 }}
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

export default SearchInput;

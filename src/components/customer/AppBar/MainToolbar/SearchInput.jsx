import { InputAdornment, TextField } from '@mui/material';
import { useEffect } from 'react';
import { SearchOutlined } from '@mui/icons-material';
import useCustomSearchParams from '../../../../hooks/useCustomSearchParams';

function SearchInput() {
  //   const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  const handleSearch = () => {
    // dispatch(asyncGetProducts({ name: searchParams.get('name') }));
  };

  useEffect(() => {
    const timerId = setTimeout(handleSearch, 300); // Create a debounce timer
    return () => clearTimeout(timerId); // Clear the previous timer on each input change
  }, [searchParams.get('name')]);

  return (
    <TextField
      size="small"
      variant="outlined"
      placeholder="Cari di GadgetGallery"
      value={searchParams.get('name') || ''}
      onChange={({ target }) => updateQueryParams({ name: target.value })}
      sx={{
        flexGrow: 1,
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

export default SearchInput;

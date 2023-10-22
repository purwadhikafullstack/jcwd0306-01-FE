import { InputAdornment, TextField } from '@mui/material';
import { useEffect } from 'react';
import { SearchOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import useCustomSearchParams from '../../../../hooks/useCustomSearchParams';
import { asyncGetProducts } from '../../../../states/products/action';

function SearchInput() {
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  const handleSearch = () => {
    dispatch(
      asyncGetProducts({
        getType: 'REPLACE',
        name: searchParams.get('name'),
        categoryId: searchParams.get('categoryId'),
        sortBy: searchParams.get('sortBy'),
        orderBy: searchParams.get('orderBy'),
        isPaginated: searchParams.get('isPaginated'),
        page: searchParams.get('page'),
        perPage: searchParams.get('perPage'),
      })
    );
  };

  useEffect(() => {
    const timerId = setTimeout(handleSearch, 300); // Create a debounce timer
    return () => clearTimeout(timerId); // Clear the previous timer on each input change
  }, [searchParams.get('name')]);

  return (
    <TextField
      onChange={({ target }) => updateQueryParams({ name: target.value })}
      size="small"
      variant="outlined"
      placeholder="Cari di GadgetGallery"
      value={searchParams.get('name') || ''}
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

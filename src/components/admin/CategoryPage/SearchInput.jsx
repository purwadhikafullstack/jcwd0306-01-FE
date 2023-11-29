import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';
import { asyncGetCategories } from '../../../states/categories/action';

function SearchInput() {
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();
  const isFirstRender = useRef(true);

  const handleSearch = () => {
    dispatch(
      asyncGetCategories({
        search: searchParams.get('search'),
        sortBy: searchParams.get('sortBy'),
        orderBy: searchParams.get('orderBy'),
        pagination: true,
        page: searchParams.get('page'),
        perPage: searchParams.get('perPage'),
      })
    );
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return () => {};
    }

    const timerId = setTimeout(handleSearch, 300);
    return () => clearTimeout(timerId);
  }, [searchParams.get('search')]);

  return (
    <TextField
      onChange={({ target }) => updateQueryParams({ search: target.value })}
      size="small"
      variant="outlined"
      placeholder="Cari Kategori"
      value={searchParams.get('search') || ''}
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

import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import useCustomSearchParams from '../../../../hooks/useCustomSearchParams';
import { asyncGetProducts } from '../../../../states/products/action';

function SearchInput() {
  const dispatch = useDispatch();
  const { warehouseId } = useParams();
  const [searchParams, updateQueryParams] = useCustomSearchParams();
  const isFirstRender = useRef(true);

  const handleSearch = () => {
    dispatch(
      asyncGetProducts({
        getType: 'REPLACE',
        search: searchParams.get('search'),
        categoryId: searchParams.get('categoryId'),
        sortBy: searchParams.get('sortBy'),
        paranoid: false,
        orderBy: searchParams.get('orderBy'),
        page: searchParams.get('page'),
        perPage: searchParams.get('perPage'),
        warehouseId,
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
      placeholder="Cari Produk"
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

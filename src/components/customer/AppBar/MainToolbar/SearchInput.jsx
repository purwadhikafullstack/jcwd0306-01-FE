import {
  Box,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { SearchOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import useCustomSearchParams from '../../../../hooks/useCustomSearchParams';
import { asyncGetProducts } from '../../../../states/products/action';
import GGLogo from '../../../GGLogo';
import useIsPathName from '../../../../hooks/useIsPathName';

function SearchInput() {
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isFirstRender = useRef(true);
  const isPageValid = useIsPathName('', 'products');

  const handleSearch = () => {
    dispatch(
      asyncGetProducts({
        getType: 'REPLACE',
        search: searchParams.get('search'),
        categoryId: searchParams.get('categoryId'),
        sortBy: searchParams.get('sortBy'),
        orderBy: searchParams.get('orderBy'),
        page: searchParams.get('page'),
        perPage: searchParams.get('perPage'),
      })
    );
  };

  useEffect(() => {
    if (isPageValid) {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return () => {};
      }
      const timerId = setTimeout(handleSearch, 300);
      return () => clearTimeout(timerId);
    }
    return () => {};
  }, [searchParams.get('search')]);

  if (!isPageValid) {
    return isSmUp ? (
      <Box flexGrow={1} />
    ) : (
      <GGLogo sx={{ fontSize: '2rem', flexGrow: 1 }} />
    );
  }

  return (
    <TextField
      onChange={({ target }) => updateQueryParams({ search: target.value })}
      size="small"
      variant="outlined"
      placeholder="Cari di GadgetGallery"
      value={searchParams.get('search') || ''}
      sx={{ flexGrow: 1, '&:focus': { border: 'none' } }}
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

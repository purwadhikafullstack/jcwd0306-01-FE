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
import { useLocation } from 'react-router-dom';
import useCustomSearchParams from '../../../../hooks/useCustomSearchParams';
import { asyncGetProducts } from '../../../../states/products/action';
import GGLogo from '../../../GGLogo';

function SearchInput() {
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();
  const theme = useTheme();
  const location = useLocation();
  const pathLocation = location.pathname.split('/')[1];
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isFirstRender = useRef(true);

  const handleSearch = () => {
    dispatch(
      asyncGetProducts({
        getType: 'REPLACE',
        name: searchParams.get('name'),
        categoryId: searchParams.get('categoryId'),
        sortBy: searchParams.get('sortBy'),
        orderBy: searchParams.get('orderBy'),
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

    const timerId = setTimeout(handleSearch, 300); // Create a debounce timer
    return () => clearTimeout(timerId); // Clear the previous timer on each input change
  }, [searchParams.get('name')]);

  if (pathLocation !== '')
    return isSmUp ? (
      <Box flexGrow={1} />
    ) : (
      <GGLogo sx={{ fontSize: '2rem', flexGrow: 1 }} />
    );

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

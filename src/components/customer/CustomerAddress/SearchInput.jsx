import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';
import { asyncGetAddress } from '../../../states/Address/action';

function SearchInput() {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  const handleSearch = () => {
    dispatch(
      asyncGetAddress({
        userId: authUser?.id,
        name: searchParams.get('name'),
        page: searchParams.get('page'),
        perPage: searchParams.get('perPage'),
      })
    );
  };

  useEffect(() => {
    if (authUser && authUser?.id) {
      handleSearch();
    }
  }, [authUser]);

  useEffect(() => {
    const timerId = setTimeout(handleSearch, 300);
    return () => clearTimeout(timerId);
  }, [searchParams.get('name')]);

  return (
    <TextField
      onChange={({ target }) => updateQueryParams({ name: target.value })}
      size="small"
      variant="outlined"
      placeholder="Search Address"
      value={searchParams.get('name') || ''}
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

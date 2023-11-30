import { InputAdornment, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';
import { asyncGetReports } from '../../../states/salesReport/action';

function SearchInput() {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);
  const id = authUser?.WarehouseUser?.warehouseId;

  const [searchParams, updateQueryParams] = useCustomSearchParams();

  const handleSearch = () => {
    dispatch(
      asyncGetReports({
        name: searchParams.get('name'),
        page: searchParams.get('page'),
        perPage: searchParams.get('perPage'),
        warehouseId: id,
      })
    );
  };

  useEffect(() => {
    const timerId = setTimeout(handleSearch, 300);
    return () => clearTimeout(timerId);
  }, [searchParams.get('name')]);

  return (
    <TextField
      onChange={({ target }) => updateQueryParams({ name: target.value })}
      size="small"
      variant="outlined"
      placeholder="Search"
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

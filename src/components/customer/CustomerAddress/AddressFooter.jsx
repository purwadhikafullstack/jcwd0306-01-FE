import { MenuItem, Pagination, Stack, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

const PER_PAGE_VALUES = [5, 10, 25, 50, 100];

function AddressFooter() {
  const addressPagination = useSelector((states) => states.addressPagination);
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  return (
    <Stack direction="row" alignItems="center">
      {/* Pagination */}
      <Pagination
        onChange={(e, page) => updateQueryParams({ page })}
        count={addressPagination.totalPage || 1}
        shape="rounded"
        color="primary"
        page={+searchParams.get('page') || 1}
        sx={{
          flexGrow: 1,
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />

      {/* PerPage Select */}
      <TextField
        onChange={({ target }) => updateQueryParams({ perPage: target.value })}
        select
        size="small"
        value={+searchParams.get('perPage') || PER_PAGE_VALUES[0]}
      >
        {PER_PAGE_VALUES.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}

export default AddressFooter;

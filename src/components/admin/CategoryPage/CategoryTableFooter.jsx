import { MenuItem, Pagination, Stack, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

function CategoryTableFooter() {
  const categoryPagination = useSelector((states) => states.categoryPagination);
  const [searchParams, updateQueryParams] = useCustomSearchParams();
  const perPageValues = useMemo(() => [10, 25, 50, 75, 100], []);

  return (
    <Stack direction="row" alignItems="center">
      {/* Pagination */}
      <Pagination
        onChange={(e, page) => updateQueryParams({ page })}
        count={categoryPagination.totalPage || 1}
        shape="rounded"
        color="primary"
        page={+searchParams.get('page') || 1}
        sx={{
          flexGrow: 1,
          '& .MuiPagination-ul': { justifyContent: 'center' },
        }}
      />

      {/* PerPage Select */}
      <TextField
        onChange={({ target }) => updateQueryParams({ perPage: target.value })}
        select
        size="small"
        value={+searchParams.get('perPage') || perPageValues[0]}
      >
        {perPageValues.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}

export default CategoryTableFooter;

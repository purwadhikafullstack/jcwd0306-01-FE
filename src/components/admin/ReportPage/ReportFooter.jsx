import { MenuItem, Pagination, Stack, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

const PER_PAGE_VALUES = [10, 25, 50, 75, 100];

function ReportFooter() {
  const salesReportPagination = useSelector(
    (states) => states.salesReportPagination
  );
  const [searchParams, updateQueryParams] = useCustomSearchParams();
  const reportData = useSelector((states) => states.salesReport);

  const isCategoryFilterActive = searchParams.get('category') !== '';

  const filteredReportData = reportData.filter(
    (val) =>
      val?.OrderProducts?.reduce((sum, product) => sum + product.quantity, 0) >
      0
  );

  // console.log(filteredReportData);

  return (
    <Stack direction="row" alignItems="center">
      {/* Pagination */}
      <Pagination
        onChange={(e, page) => updateQueryParams({ page })}
        count={salesReportPagination.totalPage || 1}
        shape="rounded"
        color="primary"
        page={+searchParams.get('page') || 1}
        sx={{
          flexGrow: 1,
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
        // disabled={isCategoryFilterActive}
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

export default ReportFooter;

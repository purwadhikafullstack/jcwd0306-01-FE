import { TablePagination } from '@mui/material';

export function PaginationTable({ count, searchParams, setSearchParams }) {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={count}
      rowsPerPage={Number(searchParams.get('limit') || 5)}
      page={searchParams.get('page') ? Number(searchParams.get('page')) - 1 : 0}
      onPageChange={(e, value) => {
        setSearchParams((params) => {
          params.set(`page`, value + 1);
          return params;
        });
      }}
      onRowsPerPageChange={(e) => {
        setSearchParams((params) => {
          params.set('limit', parseInt(e.target.value, 10));
          params.set('page', 1);
          return params;
        });
      }}
      sx={{
        '.MuiTablePagination-selectLabel': { margin: '0' },
        '.MuiTablePagination-displayedRows': { margin: '0' },
        '.MuiSelect-select': { padding: '0' },
        '.MuiInputBase-root.MuiInputBase-colorPrimary.MuiTablePagination-input.css-1sm7cl9-MuiInputBase-root-MuiTablePagination-select':
          { margin: '0 12px 0 0' },
        '.MuiTablePagination-actions': { margin: 0 },
      }}
    />
  );
}

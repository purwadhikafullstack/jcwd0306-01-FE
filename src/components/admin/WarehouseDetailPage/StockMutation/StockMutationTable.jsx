import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import SortLabelTableCell from './SortLabelTableCell';
import StockMutationTableItem from './StockMutationTableItem';

function StockMutationTable() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0.5 }}>
      <Table aria-label="Stock Mutation Table">
        <TableHead>
          <TableRow
            sx={{
              bgcolor: 'primary.main',
              '& *': { color: 'white !important' },
            }}
          >
            {/* No. */}
            <TableCell align="center">No.</TableCell>

            {/* Type */}
            <SortLabelTableCell label="type">Tipe</SortLabelTableCell>

            {/* Product Name */}
            <SortLabelTableCell label="product-name">
              Nama Produk
            </SortLabelTableCell>

            {/* Status */}
            <SortLabelTableCell label="status">Status</SortLabelTableCell>

            {/* Quantity */}
            <SortLabelTableCell label="quantity">Jumlah</SortLabelTableCell>

            {/* From Warehouse */}
            <SortLabelTableCell label="from-wh-name">
              Gudang Asal
            </SortLabelTableCell>

            {/* To Warehouse */}
            <SortLabelTableCell label="to-wh-name">
              Gudang Tujuan
            </SortLabelTableCell>

            {/* OrderId */}
            <SortLabelTableCell label="orderId">Order ID</SortLabelTableCell>

            {/* CreatedAt */}
            <SortLabelTableCell label="createdAt">
              Waktu Dibuat
            </SortLabelTableCell>

            {/* UpdatedAt */}
            <SortLabelTableCell label="updatedAt">
              Waktu Diperbarui
            </SortLabelTableCell>
          </TableRow>
        </TableHead>
        <StockMutationTableItem />
      </Table>
    </TableContainer>
  );
}

export default StockMutationTable;

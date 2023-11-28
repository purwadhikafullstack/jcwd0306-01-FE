import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ProductTableItem from './ProductTableItem';
import SortLabelTableCell from './SortLabelTableCell';

function ProductTable() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0.5 }}>
      <Table aria-label="Product Table" size="small">
        <TableHead>
          <TableRow
            sx={{
              bgcolor: 'primary.main',
              '& *': { color: 'white !important' },
              '& .MuiTableSortLabel-root': {
                width: '100%',
                justifyContent: 'center',
              },
            }}
          >
            {/* No. */}
            <TableCell>No.</TableCell>

            {/* Status */}
            <SortLabelTableCell label="deletedAt">Status</SortLabelTableCell>

            {/* Image */}
            <TableCell>Gambar</TableCell>

            {/* Name */}
            <SortLabelTableCell label="name">Nama</SortLabelTableCell>

            {/* Stock */}
            <SortLabelTableCell label="stock">Stok</SortLabelTableCell>

            {/* Stock Mutation */}
            <TableCell>Mutasi Stok</TableCell>

            {/* Price */}
            <SortLabelTableCell label="price">Harga (Rp)</SortLabelTableCell>

            {/* Weight */}
            <SortLabelTableCell label="weight">Berat (gr)</SortLabelTableCell>

            {/* Discount */}
            <SortLabelTableCell label="discount">Diskon</SortLabelTableCell>

            {/* Description */}
            <SortLabelTableCell label="description">
              Deskripsi
            </SortLabelTableCell>

            {/* Categories */}
            <TableCell>Kategori</TableCell>

            {/* CreatedAt */}
            <SortLabelTableCell label="createdAt">
              Tanggal Dibuat
            </SortLabelTableCell>

            {/* UpdatedAt */}
            <SortLabelTableCell label="updatedAt">
              Tanggal Diperbarui
            </SortLabelTableCell>
          </TableRow>
        </TableHead>
        <ProductTableItem />
      </Table>
    </TableContainer>
  );
}

export default ProductTable;

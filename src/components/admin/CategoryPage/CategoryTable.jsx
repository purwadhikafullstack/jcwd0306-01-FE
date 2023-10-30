import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CategoryTableItem from './CategoryTableItem';

function CategoryTable() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0.5 }}>
      <Table aria-label="Category Table">
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ color: 'white' }}>ID</TableCell>
            <TableCell sx={{ color: 'white' }}>Gambar</TableCell>
            <TableCell sx={{ color: 'white' }}>Nama</TableCell>
            <TableCell sx={{ color: 'white' }}>Total Produk</TableCell>
            <TableCell sx={{ color: 'white' }}>Tanggal Dibuat</TableCell>
            <TableCell sx={{ color: 'white' }}>Tanggal Diperbarui</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <CategoryTableItem />
      </Table>
    </TableContainer>
  );
}

export default CategoryTable;

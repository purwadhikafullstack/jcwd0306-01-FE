import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';
import CategoryTableItem from './CategoryTableItem';
import SortLabelTableCell from './SortLabelTableCell';

function CategoryTable() {
  const authUser = useSelector((states) => states.authUser);

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0.5 }}>
      <Table aria-label="Category Table">
        <TableHead>
          <TableRow
            sx={{
              bgcolor: 'primary.main',
              '& *': { color: 'white !important' },
            }}
          >
            <TableCell align="center">No.</TableCell>
            <TableCell align="center">Gambar</TableCell>
            <SortLabelTableCell label="name">Nama</SortLabelTableCell>
            {authUser.isAdmin && <TableCell align="center">Aksi</TableCell>}
            <SortLabelTableCell label="totalProducts">
              Total Produk
            </SortLabelTableCell>
            <SortLabelTableCell label="createdAt">
              Waktu Dibuat
            </SortLabelTableCell>
            <SortLabelTableCell label="updatedAt">
              Waktu Diperbarui
            </SortLabelTableCell>
          </TableRow>
        </TableHead>

        <CategoryTableItem />
      </Table>
    </TableContainer>
  );
}

export default CategoryTable;

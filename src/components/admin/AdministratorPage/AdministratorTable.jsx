import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AdministratorTableItem from './AdministratorTableItem';
// import CategoryTableItem from './CategoryTableItem';

function AdministratorTable() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0.5 }}>
      <Table aria-label="Category Table">
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ color: 'white' }}>No</TableCell>
            <TableCell sx={{ color: 'white' }}>Gambar</TableCell>
            <TableCell sx={{ color: 'white' }}>Nama</TableCell>
            <TableCell sx={{ color: 'white' }}>Warehouse</TableCell>
            <TableCell sx={{ color: 'white' }}>Tanggal Dibuat</TableCell>
            <TableCell sx={{ color: 'white' }}>Tanggal Diperbarui</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <AdministratorTableItem />
      </Table>
    </TableContainer>
  );
}

export default AdministratorTable;

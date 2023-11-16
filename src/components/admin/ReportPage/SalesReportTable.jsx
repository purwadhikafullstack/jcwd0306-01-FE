import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import SalesReportTableItem from './SalesReportTableItem';

function SalesReportTable() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0.5 }}>
      <Table aria-label="Category Table">
        <TableHead>
          <TableRow sx={{ bgcolor: '#4ca3ed' }}>
            <TableCell sx={{ color: 'white' }}>No</TableCell>
            <TableCell sx={{ color: 'white' }}>Invoice</TableCell>
            <TableCell sx={{ color: 'white' }}>Sent to</TableCell>
            <TableCell sx={{ color: 'white' }}>warehouse origin</TableCell>
            <TableCell sx={{ color: 'white' }}>Transaction Date </TableCell>
            <TableCell sx={{ color: 'white' }}>Total </TableCell>
          </TableRow>
        </TableHead>
        <SalesReportTableItem />
      </Table>
    </TableContainer>
  );
}

export default SalesReportTable;

import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AdministratorTableItem from './AdministratorTableItem';
import SortLabelTableCell from './SortLabelTableCell';
// import CategoryTableItem from './CategoryTableItem';

function AdministratorTable() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0.5 }}>
      <Table aria-label="Category Table">
        <TableHead>
          <TableRow sx={{ bgcolor: '#33c7cc' }}>
            <TableCell sx={{ color: 'white' }}>No</TableCell>
            <SortLabelTableCell label="name">Name</SortLabelTableCell>
            <SortLabelTableCell label="email">Email</SortLabelTableCell>
            <SortLabelTableCell label="warehouseName">
              warehouse
            </SortLabelTableCell>
            <SortLabelTableCell label="warehouseLoc">
              Warehouse Location
            </SortLabelTableCell>
            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <AdministratorTableItem />
      </Table>
    </TableContainer>
  );
}

export default AdministratorTable;

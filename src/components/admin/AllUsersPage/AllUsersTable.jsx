import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AllUsersTableItem from './AllUsersTableItem';
import SortLabelTableCell from './SortLabelTableCell';

function AllUsersTable({ users, whAdmin }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0.5 }}>
      <Table aria-label="Category Table">
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ color: 'white' }}>No</TableCell>
            <TableCell sx={{ color: 'white' }}>Image</TableCell>
            <SortLabelTableCell label="firstName">
              First Name
            </SortLabelTableCell>
            <SortLabelTableCell label="lastName">Last Name</SortLabelTableCell>
            <SortLabelTableCell label="email">Email</SortLabelTableCell>
            <TableCell sx={{ color: 'white' }}>Join Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Role</TableCell>
          </TableRow>
        </TableHead>
        <AllUsersTableItem users={users} whAdmin={whAdmin} />
      </Table>
    </TableContainer>
  );
}

export default AllUsersTable;

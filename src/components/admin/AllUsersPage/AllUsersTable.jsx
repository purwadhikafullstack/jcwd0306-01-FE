import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AllUsersTableItem from './AllUsersTableItem';

function AllUsersTable({ users, whAdmin }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0.5 }}>
      <Table aria-label="Category Table">
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ color: 'white' }}>No</TableCell>
            <TableCell sx={{ color: 'white' }}>Image</TableCell>
            <TableCell sx={{ color: 'white' }}>First Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Last Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Email</TableCell>
            <TableCell sx={{ color: 'white' }}>Role</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <AllUsersTableItem users={users} whAdmin={whAdmin} />
      </Table>
    </TableContainer>
  );
}

export default AllUsersTable;

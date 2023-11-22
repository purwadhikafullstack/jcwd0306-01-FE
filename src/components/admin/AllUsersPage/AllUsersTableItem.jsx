// import { DeleteRounded, EditNoteRounded } from '@mui/icons-material';
import {
  Avatar,
  // IconButton,
  // Stack,
  TableBody,
  TableCell,
  TableRow,
  // Tooltip,
  Typography,
} from '@mui/material';
// import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { Roles } from './Roles';

function AllUsersTableItem({ whAdmin }) {
  const authUser = useSelector((state) => state.authUser);
  const globalUser = useSelector((states) => states.allUser);

  let idCounter = 1;
  return (
    <TableBody>
      {/* When category not found */}
      {!globalUser.length && (
        <TableRow>
          <TableCell colSpan={5}>
            <Typography variant="body2" align="center" ml={10}>
              User tidak ditemukan
            </Typography>
          </TableCell>
        </TableRow>
      )}

      {/* When category exist */}
      {globalUser.map((val) => (
        <TableRow
          key={val.id}
          sx={{ bgcolor: val.id === authUser?.id ? 'bisque' : '' }}
        >
          {/* ID column */}
          <TableCell>{idCounter++}</TableCell>

          {/* Image column */}
          <TableCell>
            <Avatar
              variant="square"
              alt={val.name}
              src={`${import.meta.env.VITE_API_BASE_URL}/user/${val.id}/image`}
            />
          </TableCell>

          {/* First Name column */}
          <TableCell>{val.firstName}</TableCell>

          {/* Last Name column */}
          <TableCell>{val.lastName}</TableCell>

          {/* Email column */}
          <TableCell>{val.email}</TableCell>

          {/* Role column */}
          <TableCell>
            <Roles val={val} whAdmin={whAdmin} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default AllUsersTableItem;

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

function AllUsersTableItem({ users, whAdmin }) {
  // users.map((val) => console.log(val));
  // whAdmin.map((values) => console.log(values));
  const authUser = useSelector((state) => state.authUser);

  return (
    <>
      <TableBody>
        {/* When category not found */}
        {!users.length && (
          <TableRow>
            <TableCell colSpan={5}>
              <Typography variant="body2" align="center">
                User tidak ditemukan
              </Typography>
            </TableCell>
          </TableRow>
        )}

        {/* When category exist */}
        {users.map((val) => (
          <TableRow
            key={val.id}
            sx={{ bgcolor: val.id === authUser?.id ? 'bisque' : '' }}
          >
            {/* ID column */}
            <TableCell>{val.id}</TableCell>

            {/* Image column */}
            <TableCell>
              <Avatar
                variant="square"
                alt={val.name}
                src={`${import.meta.env.VITE_API_BASE_URL}/user/${
                  val.id
                }/image`}
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

      {/* Edit Dialog */}
      {/* <EditDialog
        category={category}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      /> */}
    </>
  );
}

export default AllUsersTableItem;

import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchInput from './SearchInput';
import AllUsersTable from './AllUsersTable';
import api from '../../../constants/api';
import AllUsersFooter from './AllUsersFooter';
import { setAlertActionCreator } from '../../../states/alert/action';

function ContainerAllUsersPage() {
  const [users, setUsers] = useState([]);
  const [whAdmin, setWhAdmin] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.get('/user/getAll');
        setUsers(data.data.data);
        /* role */
        const res = await api.get('/warehouseusers');
        setWhAdmin(res.data.data);
      } catch (err) {
        dispatch(setAlertActionCreator({ err }));
      }
    };

    fetchUsers();
  }, []);

  return (
    <Stack
      spacing={3}
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
      }}
    >
      {/* Title */}
      <Typography fontWeight={800} fontSize="1.2rem">
        List Of All Users
      </Typography>
      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
        {/* Search Users Input */}
        <SearchInput />
      </Stack>

      {/* All Users Table */}
      <AllUsersTable users={users} whAdmin={whAdmin} />

      {/* Footer */}
      <AllUsersFooter />
    </Stack>
  );
}

export default ContainerAllUsersPage;

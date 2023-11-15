import { Button, Stack, Typography } from '@mui/material';
// import { useState } from 'react';
import { AddRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import AllUsersTable from './AllUsersTable';
import api from '../../../constants/api';
import AllUsersFooter from './AllUsersFooter';
// import SearchInput from './SearchInput';
// import AdministratorTable from './AdministratorTable';
// import { CreatedDialog } from './CreateDialog/CreateDialog';

function ContainerAllUsersPage() {
  const [users, setUsers] = useState([]);
  const [whAdmin, setWhAdmin] = useState([]);
  // console.log({ users, whAdmin });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.get('/user/getAll');
        // console.log(data);
        setUsers(data.data.data);
        /* role */
        const res = await api.get('/warehouseusers');
        // console.log(res);
        setWhAdmin(res.data.data);
      } catch (error) {
        console.log(error);
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
        All Users
      </Typography>
      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
        {/* Search Users Input */}
        <SearchInput />

        {/* Create Category Button */}
        <Button
          onClick={null}
          variant="contained"
          startIcon={<AddRounded />}
          sx={{ textTransform: 'none' }}
        >
          WH - Admin
        </Button>
      </Stack>
      {/* All Users Table */}
      <AllUsersTable users={users} whAdmin={whAdmin} />

      {/* Footer */}
      <AllUsersFooter />
    </Stack>
  );
}

export default ContainerAllUsersPage;

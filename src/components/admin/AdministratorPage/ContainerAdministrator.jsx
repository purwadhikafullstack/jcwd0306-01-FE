import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { AddRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import SearchInput from './SearchInput';
import AdministratorTable from './AdministratorTable';

function ContainerAdministrator({ test }) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const warehouseAdmin = useSelector((state) => state.administrator);
  // console.log(warehouseAdmin);

  return (
    <>
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
          Manage Warehouse Admin
        </Typography>
        <Button onClick={() => test()}>test</Button>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
          {/* Search Categories Input */}
          <SearchInput />

          {/* Create Category Button */}
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            variant="contained"
            startIcon={<AddRounded />}
            sx={{ textTransform: 'none' }}
          >
            Admin
          </Button>
        </Stack>
        {/* Category Table */}
        <AdministratorTable />
      </Stack>

      {/* Create Category Dialog */}
      {/* <CreateDialog
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
      /> */}
    </>
  );
}

export default ContainerAdministrator;

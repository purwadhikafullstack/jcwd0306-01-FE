import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { AddRounded } from '@mui/icons-material';
import SearchInput from './SearchInput';
import AdministratorTable from './AdministratorTable';
import { CreatedDialog } from './CreateDialog/CreateDialog';
import AdministratorFooter from './AdministratorFooter';

function ContainerAdministrator() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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
            WH - Admin
          </Button>
        </Stack>
        {/* Category Table */}
        <AdministratorTable />

        {/* Footer */}
        <AdministratorFooter />
      </Stack>

      {/* Create Category Dialog */}
      <CreatedDialog
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
      />
    </>
  );
}

export default ContainerAdministrator;

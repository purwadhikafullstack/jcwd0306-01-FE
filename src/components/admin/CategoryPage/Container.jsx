import { Button, Stack, Typography } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CategoryTable from './CategoryTable';
import SearchInput from './SearchInput';
import CreateDialog from './CreateDialog';
import CategoryTableFooter from './CategoryTableFooter';

function Container() {
  const authUser = useSelector((states) => states.authUser);
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
        <Typography fontWeight={800} fontSize="1.2rem">
          Kategori
        </Typography>

        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
          <SearchInput />

          {/* Create Category Button */}
          {authUser.isAdmin && (
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              variant="contained"
              startIcon={<AddRounded />}
              sx={{ textTransform: 'none' }}
            >
              Kategori
            </Button>
          )}
        </Stack>

        <CategoryTable />

        <CategoryTableFooter />
      </Stack>

      {/* Create Category Dialog */}
      {authUser.isAdmin && (
        <CreateDialog
          isCreateDialogOpen={isCreateDialogOpen}
          setIsCreateDialogOpen={setIsCreateDialogOpen}
        />
      )}
    </>
  );
}

export default Container;

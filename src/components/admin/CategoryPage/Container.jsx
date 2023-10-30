import { Button, Stack, Typography } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useState } from 'react';
import CategoryTable from './CategoryTable';
import SearchInput from './SearchInput';
import CreateDialog from './CreateDialog';

function Container() {
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
          Kategori
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
            Kategori
          </Button>
        </Stack>

        {/* Category Table */}
        <CategoryTable />
      </Stack>

      {/* Create Category Dialog */}
      <CreateDialog
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
      />
    </>
  );
}

export default Container;

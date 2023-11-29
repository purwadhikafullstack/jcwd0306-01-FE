import { AddRounded, SortRounded } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateDialog from './CreateDialog';

import WarehouseList from './WarehouseList';
import WarheouseListFooter from './WarehouseListFooter';
import SearchInput from './SearchInput';
import SortDialog from './SortDialog';

function Container() {
  const authUser = useSelector((states) => states.authUser);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSortDialogOpen, setIsSortDialogOpen] = useState(false);

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
          Gudang
        </Typography>

        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
          <SearchInput />

          {/* Create Warehouse Button */}
          {authUser.isAdmin && (
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              variant="contained"
              startIcon={<AddRounded />}
              sx={{ textTransform: 'none' }}
            >
              Gudang
            </Button>
          )}
        </Stack>

        <Stack direction="row" spacing={1}>
          <Box flexGrow={1} />
          <Button
            size="small"
            onClick={() => setIsSortDialogOpen(true)}
            variant="outlined"
            sx={{ borderRadius: '10rem' }}
          >
            <SortRounded />
          </Button>
        </Stack>

        <WarehouseList />

        <WarheouseListFooter />
      </Stack>

      {/* Create Warehouse Dialog */}
      {authUser.isAdmin && (
        <CreateDialog
          isCreateDialogOpen={isCreateDialogOpen}
          setIsCreateDialogOpen={setIsCreateDialogOpen}
        />
      )}

      <SortDialog
        isSortDialogOpen={isSortDialogOpen}
        setIsSortDialogOpen={setIsSortDialogOpen}
      />
    </>
  );
}

export default Container;

import { AddRounded } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CreateDialog from './CreateDialog';

import WarehouseList from './WarehouseList';

function Container() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <Stack
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Stack spacing={5}>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            {/* Title */}
            <Typography fontWeight={800} fontSize="1.2rem">
              Gudang
            </Typography>

            {/* Create Warehouse Button */}
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              variant="contained"
              startIcon={<AddRounded />}
              sx={{ textTransform: 'none' }}
            >
              Gudang
            </Button>
          </Stack>

          {/* Warehouse List */}
          <WarehouseList />
        </Stack>
      </Stack>

      {/* Create Warehouse Dialog */}
      <CreateDialog
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
      />
    </>
  );
}

export default Container;

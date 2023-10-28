import { AddCircleRounded } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CreateDialog from './CreateDialog';

import WarehouseList from './WarehouseList';

function Container() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <Stack gap={4} sx={{ maxWidth: 'lg', py: '1rem' }}>
        <Stack
          sx={{
            width: '100%',
            mx: 'auto',
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row">
              {/* Title */}
              <Typography fontWeight={800} fontSize="1.2rem">
                Gudang
              </Typography>

              <Box flexGrow={1} />

              {/* Create Warehouse Button */}
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                variant="contained"
                startIcon={<AddCircleRounded />}
                sx={{ textTransform: 'none' }}
              >
                Gudang
              </Button>
            </Stack>

            {/* Warehouse List */}
            <WarehouseList />
          </Stack>
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

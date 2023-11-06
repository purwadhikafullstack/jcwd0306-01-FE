import { Button, Stack, Typography } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useState } from 'react';
import SearchInput from './SearchInput';
import ProductTable from './ProductTable';
import CreateDialog from './CreateDialog';
import ProductTableFooter from './ProductTableFooter';

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
          Produk
        </Typography>

        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
          {/* Search Products Input */}
          <SearchInput />

          {/* Create Product Button */}
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            variant="contained"
            startIcon={<AddRounded />}
            sx={{ textTransform: 'none' }}
          >
            Produk
          </Button>
        </Stack>

        {/* Product Table */}
        <ProductTable />

        {/* Product Table Footer */}
        <ProductTableFooter />
      </Stack>

      {/* Create Product Dialog */}
      <CreateDialog
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
      />
    </>
  );
}

export default Container;

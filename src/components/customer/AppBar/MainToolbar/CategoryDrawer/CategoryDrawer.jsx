import { Drawer, Toolbar, useTheme } from '@mui/material';
import CategoryImageList from './CategoryImageList';

function CategoryDrawer({ isCategoryDrawerOpen, setIsCategoryDrawerOpen }) {
  const theme = useTheme();

  return (
    <Drawer
      anchor="top"
      open={isCategoryDrawerOpen}
      onClose={() => setIsCategoryDrawerOpen(false)}
      PaperProps={{
        sx: { maxHeight: '80vh' },
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          [theme.breakpoints.down('md')]: { display: 'none' },
        }}
      />
      <Toolbar />
      <Toolbar variant="dense" />
      <CategoryImageList />
    </Drawer>
  );
}

export default CategoryDrawer;

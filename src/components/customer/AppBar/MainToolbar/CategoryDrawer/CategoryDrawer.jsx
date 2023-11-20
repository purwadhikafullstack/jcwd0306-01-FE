import { Drawer, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { bool, func } from 'prop-types';
import CategoryImageList from './CategoryImageList';

function CategoryDrawer({ isCategoryDrawerOpen, setIsCategoryDrawerOpen }) {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  if (isSmDown) return null;

  return (
    <Drawer
      anchor="top"
      open={isCategoryDrawerOpen}
      onClose={() => setIsCategoryDrawerOpen(false)}
      PaperProps={{ sx: { maxHeight: '80vh' } }}
    >
      <Toolbar variant="dense" />
      <Toolbar />
      <Toolbar variant="dense" />
      <CategoryImageList setIsCategoryDrawerOpen={setIsCategoryDrawerOpen} />
    </Drawer>
  );
}

CategoryDrawer.propTypes = {
  isCategoryDrawerOpen: bool.isRequired,
  setIsCategoryDrawerOpen: func.isRequired,
};

export default CategoryDrawer;

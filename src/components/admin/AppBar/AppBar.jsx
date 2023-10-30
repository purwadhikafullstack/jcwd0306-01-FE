import { AppBar as MuiAppBar } from '@mui/material';
import { useState } from 'react';
import MainToolbar from './MainToolbar/MainToolbar';
import MenuDrawer from './MenuDrawer/MenuDrawer';

function AppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <MuiAppBar
        position="sticky"
        sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
      >
        {/* Main Toolbar */}
        <MainToolbar setIsDrawerOpen={setIsDrawerOpen} />
      </MuiAppBar>

      {/* Menu Drawer */}
      <MenuDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
}

export default AppBar;

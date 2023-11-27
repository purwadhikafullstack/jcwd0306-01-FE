import { AppBar as MuiAppBar, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import MainToolbar from './MainToolbar/MainToolbar';
import MenuDrawer from './MenuDrawer/MenuDrawer';
import BottomToolbar from './BottomToolbar/BottomToolbar';

function AppBar() {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <MuiAppBar
        position="sticky"
        sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
      >
        {/* Main Toolbar */}
        <MainToolbar setIsDrawerOpen={setIsDrawerOpen} />
        {isMdDown && <BottomToolbar />}
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

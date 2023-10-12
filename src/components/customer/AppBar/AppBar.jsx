import { AppBar as MuiAppBar } from '@mui/material';
import { useState } from 'react';
import TopToolBar from './TopToolbar/TopToolbar';
import BottomToolbar from './BottomToolbar/BottomToolbar';
import MainToolbar from './MainToolbar/MainToolbar';
import CategoryDrawer from './MainToolbar/CategoryDrawer/CategoryDrawer';

function AppBar() {
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  return (
    <>
      <MuiAppBar
        position="sticky"
        sx={{
          bgcolor: 'background.paper',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: 1,
        }}
      >
        <TopToolBar />
        <MainToolbar setIsCategoryDrawerOpen={setIsCategoryDrawerOpen} />
        <BottomToolbar />
      </MuiAppBar>
      <CategoryDrawer
        isCategoryDrawerOpen={isCategoryDrawerOpen}
        setIsCategoryDrawerOpen={setIsCategoryDrawerOpen}
      />
    </>
  );
}

export default AppBar;

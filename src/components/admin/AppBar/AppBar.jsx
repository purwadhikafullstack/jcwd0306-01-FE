import { AppBar as MuiAppBar } from '@mui/material';
import TopToolbar from './TopToolbar/TopToolbar';
import MainToolbar from './MainToolbar/MainToolbar';

function AppBar() {
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
        <TopToolbar />
        <MainToolbar />
      </MuiAppBar>
      {/* <MenuDrawer /> */}
    </>
  );
}

export default AppBar;

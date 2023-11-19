import { AppBar as MuiAppBar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import TopToolBar from './TopToolbar/TopToolbar';
import BottomToolbar from './BottomToolbar/BottomToolbar';
import MainToolbar from './MainToolbar/MainToolbar';
import CategoryDrawer from './MainToolbar/CategoryDrawer/CategoryDrawer';
import { asyncGetCategories } from '../../../states/categories/action';

function AppBar() {
  const dispatch = useDispatch();
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const location = useLocation();
  const pathLocation = location.pathname.split('/')[1];

  useEffect(() => {
    dispatch(asyncGetCategories());
  }, [dispatch]);

  if (['login', 'register', 'verify', 'forget-password'].includes(pathLocation))
    return null;

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

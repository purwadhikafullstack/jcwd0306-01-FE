import { Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { useContext } from 'react';
import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ModeContext from '../../../../contexts/ModeContext';

function BottomToolbar() {
  const authUser = useSelector((states) => states.authUser);
  const { mode, toggleMode } = useContext(ModeContext);

  return (
    <Toolbar variant="dense" sx={{ minHeight: 'fit-content' }}>
      <Typography color="text.secondary" variant="subtitle2" fontSize="1rem">
        {authUser?.isAdmin
          ? 'Admin'
          : `Warehouse Admin: ${authUser.WarehouseUser.Warehouse.name}`}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Tooltip arrow title={`Mode ${mode === 'dark' ? 'terang' : 'gelap'}`}>
        <IconButton onClick={toggleMode}>
          {mode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default BottomToolbar;

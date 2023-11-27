import {
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useContext } from 'react';
import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import CustomerAddressButton from './CustomerAddressButton';
import { BackToHome } from './BackToHome';
import useIsPathName from '../../../../hooks/useIsPathName';
import ModeContext from '../../../../contexts/ModeContext';

function BottomToolbar() {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isCartPage = useIsPathName('cart');
  const { mode, toggleMode } = useContext(ModeContext);

  return (
    <Toolbar variant="dense" sx={{ minHeight: 'fit-content' }}>
      {isSmDown && isCartPage && <BackToHome />}
      <Box sx={{ flexGrow: 1 }} />
      <Stack direction="row" spacing={2}>
        {!(isCartPage && isSmDown) && <CustomerAddressButton />}
        <Tooltip arrow title={`Mode ${mode === 'dark' ? 'terang' : 'gelap'}`}>
          <IconButton onClick={toggleMode}>
            {mode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
          </IconButton>
        </Tooltip>
      </Stack>
    </Toolbar>
  );
}

export default BottomToolbar;

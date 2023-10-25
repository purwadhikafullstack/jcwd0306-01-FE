import { Toolbar, useTheme } from '@mui/material';
import DownloadAppButton from './DownloadAppButton';

function TopToolBar() {
  const theme = useTheme();

  return (
    <Toolbar
      variant="dense"
      sx={{
        [theme.breakpoints.down('md')]: { display: 'none' },
        bgcolor: 'action.hover',
        minHeight: 'fit-content',
      }}
    >
      <DownloadAppButton />
    </Toolbar>
  );
}

export default TopToolBar;

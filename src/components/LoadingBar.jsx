import { useTheme } from '@mui/material';
import ReduxLoadingBar from 'react-redux-loading-bar';

function LoadingBar() {
  const theme = useTheme();
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10000,
      }}
    >
      <ReduxLoadingBar
        style={{ backgroundColor: theme.palette.primary.main }}
      />
    </div>
  );
}

export default LoadingBar;

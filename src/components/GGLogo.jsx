import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function GGLogo({ sx = {} }) {
  return (
    <Box
      sx={{
        '& a': {
          color: 'primary.main',
          textDecoration: 'none',
          fontFamily: '"Righteous", sans-serif',
        },
        ...sx,
      }}
    >
      <Link to="/" className="gg-logo">
        GG
      </Link>
    </Box>
  );
}

export default GGLogo;

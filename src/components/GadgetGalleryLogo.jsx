import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function GadgetGalleryLogo({ sx = {} }) {
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
      <Link to="/">GadgetGallery</Link>
    </Box>
  );
}

export default GadgetGalleryLogo;

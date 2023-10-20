import { GridViewOutlined } from '@mui/icons-material';
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material';

function CategoryButton({ setIsCategoryDrawerOpen }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isBetweenSmMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  if (isMdUp) {
    return (
      <Button
        variant="outlined"
        color="primary"
        sx={{ textTransform: 'none' }}
        onClick={() => setIsCategoryDrawerOpen((prevState) => !prevState)}
      >
        Kategori
      </Button>
    );
  }

  if (isBetweenSmMd) {
    return (
      <IconButton
        color="text"
        onClick={() => setIsCategoryDrawerOpen((prevState) => !prevState)}
      >
        <GridViewOutlined />
      </IconButton>
    );
  }

  return null;
}

export default CategoryButton;

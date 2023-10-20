import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';

function CategoryImageList() {
  const categories = useSelector((states) => states.categories);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ImageList
      cols={isMdUp ? 6 : 4}
      gap={10}
      variant="masonry"
      sx={{
        maxWidth: theme.breakpoints.values.lg,
        [theme.breakpoints.up('lg')]: { mx: 'auto' },
        [theme.breakpoints.down('lg')]: { mx: 5 },
      }}
    >
      {categories.map((category) => (
        <ImageListItem
          key={category.id}
          component={Button}
          sx={{ p: 0, borderRadius: 1, overflow: 'clip', boxShadow: 3 }}
        >
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/categories/${
              category.id
            }/image`}
            alt={category.name}
            loading="lazy"
          />
          <ImageListItemBar title={category.name} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default CategoryImageList;

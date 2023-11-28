import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { func } from 'prop-types';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';

function CategoryImageList({ setIsCategoryDrawerOpen }) {
  const categories = useSelector((states) => states.categories);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ImageList
      cols={isMdUp ? 6 : 4}
      gap={10}
      variant="standard"
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
          onClick={() => {
            navigate({
              pathname: '/products',
              search: createSearchParams({
                categoryId: category.id,
              }).toString(),
            });
            setIsCategoryDrawerOpen(false);
          }}
          sx={{
            p: 0,
            borderRadius: 1,
            overflow: 'clip',
            boxShadow: 3,
            aspectRatio: '1 / 1',
          }}
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

CategoryImageList.propTypes = {
  setIsCategoryDrawerOpen: func.isRequired,
};

export default CategoryImageList;

import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const categories = [
  {
    id: 1,
    name: 'Smartphone',
  },
  {
    id: 2,
    name: 'Laptop',
  },
  {
    id: 3,
    name: 'Smartwatch',
  },
  {
    id: 4,
    name: 'Mini PC',
  },
  {
    id: 5,
    name: 'Smartband',
  },
  {
    id: 6,
    name: 'Komputer',
  },
  {
    id: 7,
    name: 'Smartphone',
  },
  {
    id: 8,
    name: 'Laptop',
  },
  {
    id: 9,
    name: 'Smartwatch',
  },
  {
    id: 10,
    name: 'Mini PC',
  },
  {
    id: 11,
    name: 'Smartband',
  },
  {
    id: 12,
    name: 'Komputer',
  },
];

function CategoryImageList() {
  //   const categories = useSelector((states) => states.categories);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ImageList
      cols={isMdUp ? 6 : 4}
      gap={10}
      variant="masonry"
      sx={{
        mx: { md: 5, lg: 'auto' },
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
            // src={`${import.meta.env.VITE_API_BASE_URL}/api/categories/${
            //   category.id
            // }/image`}
            src="https://source.unsplash.com/random"
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

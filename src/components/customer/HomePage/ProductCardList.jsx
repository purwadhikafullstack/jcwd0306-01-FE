import {
  ImageList,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ProductCardItem from './ProductCardItem';
import MoreProductsButton from './MoreProductsButton';

function ProductCardList() {
  const products = useSelector((states) => states.products);
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Stack>
      <ImageList
        cols={(() => {
          if (isSmDown) return 2;
          if (isMdDown) return 3;
          if (isLgDown) return 4;
          return 6;
        })()}
        gap={12}
        variant="standard"
        sx={{ p: 1 }}
      >
        {products.map((product) => (
          <ProductCardItem
            key={product.id}
            image={`${import.meta.env.VITE_API_BASE_URL}/products/images/${
              product.imageIds[0]
            }`}
            id={product.id}
            name={product.name}
            price={product.price}
            sold={product.sold}
          />
        ))}
      </ImageList>
      {products.length > 0 ? (
        <MoreProductsButton />
      ) : (
        <Typography textAlign="center">Produk Tidak Ditemukan</Typography>
      )}
    </Stack>
  );
}

export default ProductCardList;

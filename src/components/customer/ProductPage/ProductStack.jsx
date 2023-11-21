import {
  ImageList,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ProductCardItem from '../HomePage/ProductCardItem';
import PaginationStack from './PaginationStack';

function ProductStack() {
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
          <ProductCardItem key={product.id} product={product} />
        ))}
      </ImageList>
      {products.length > 0 ? (
        <PaginationStack />
      ) : (
        <Typography textAlign="center">Produk Tidak Ditemukan</Typography>
      )}
    </Stack>
  );
}

export default ProductStack;
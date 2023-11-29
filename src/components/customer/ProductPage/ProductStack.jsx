import { ImageList, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ProductCardItem from '../HomePage/ProductCardItem';
import PaginationStack from './PaginationStack';

function ProductStack() {
  const products = useSelector((states) => states.products);

  return (
    <Stack>
      <ImageList
        gap={12}
        variant="standard"
        sx={{
          p: 1,
          gridTemplateColumns:
            'repeat(auto-fill, minmax(10rem, 1fr)) !important',
        }}
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

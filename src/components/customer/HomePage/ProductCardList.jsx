import { ImageList, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ProductCardItem from './ProductCardItem';
import MoreProductsButton from './MoreProductsButton';

function ProductCardList() {
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
        <MoreProductsButton />
      ) : (
        <Typography textAlign="center">Produk Tidak Ditemukan</Typography>
      )}
    </Stack>
  );
}

export default ProductCardList;

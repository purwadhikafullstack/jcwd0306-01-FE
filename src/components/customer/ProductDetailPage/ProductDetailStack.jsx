import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

function ProductDetailStack() {
  const product = useSelector((states) => states.product);

  return (
    <Stack spacing={2}>
      <Typography fontWeight={600}>Detail Produk</Typography>
      <Typography>{product.description}</Typography>
    </Stack>
  );
}

export default ProductDetailStack;

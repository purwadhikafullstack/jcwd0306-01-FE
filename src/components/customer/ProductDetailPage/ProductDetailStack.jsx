import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

function ProductDetailStack() {
  const product = useSelector((states) => states.product);

  return (
    <Stack
      spacing={2}
      sx={{ wordWrap: 'break-word', '& img': { maxWidth: '100%' } }}
    >
      <Typography fontWeight={800}>Detail Produk</Typography>
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
    </Stack>
  );
}

export default ProductDetailStack;

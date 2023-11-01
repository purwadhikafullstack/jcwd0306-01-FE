import { Stack, Typography } from '@mui/material';
import { OrderProductCard } from '../../OrderPayment/OrderProductsCard';

export function Products({ order = {} }) {
  return (
    <Stack gap={1} borderTop="4px solid gainsboro" pb={1} pt={2}>
      <Typography>
        <b>Products</b>
      </Typography>
      <Stack>
        {order?.OrderProducts
          ? order?.OrderProducts.map((product) => (
              <OrderProductCard product={product} key={product.productId} />
            ))
          : null}
      </Stack>
    </Stack>
  );
}

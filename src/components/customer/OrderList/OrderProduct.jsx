import { Button, Link, Stack, Typography } from '@mui/material';
import { CartItemImage } from '../Cart/CartItemImage';

export function OrderProduct({ order = {}, setOrderDetail, setOpen }) {
  const product = order?.OrderProducts[0];
  const totalItem = order?.OrderProducts.length;
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <CartItemImage product={product} width="65px" />
        <div>
          <Typography>
            <Link
              href={`/products/${product?.productId}`}
              className="text-decoration-none"
            >
              <span>{product?.Product?.name}</span>
              {totalItem > 2 ? (
                <span>
                  and {totalItem - 1} other{totalItem - 1 > 1 ? 's' : null}
                </span>
              ) : null}
            </Link>
          </Typography>
          <Typography>
            <small>
              {product?.quantity} item
              {product?.quantity > 1 ? 's' : null} x Rp
              {product?.price.toLocaleString(`id-ID`)}
            </small>
          </Typography>
          {totalItem > 1 ? (
            <Button
              className="text-secondary-subtle"
              onClick={() => {
                setOrderDetail(order);
                setOpen(true);
              }}
            >
              <small>
                + {totalItem - 1} other{totalItem - 1 > 1 ? 's' : null}
              </small>
            </Button>
          ) : null}
        </div>
      </Stack>
      <Stack className="d-sm-flex d-none">
        <div>Total Payment</div>
        <div>
          <b>Rp{order.total.toLocaleString(`id-ID`)}</b>
        </div>
      </Stack>
    </Stack>
  );
}

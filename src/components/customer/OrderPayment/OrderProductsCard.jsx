import {
  Card,
  CardContent,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { CartItemImage } from '../Cart/CartItemImage';

export function OrderProductCard({ product }) {
  return (
    <Card>
      <CardContent>
        <Grid container className="w-100">
          <Grid container className="w-100 flex-row justify-content-between">
            <Grid item flexGrow={1}>
              <Stack direction="row" gap={1} alignItems="center">
                <CartItemImage product={product} width="50px" />
                <div>
                  <Typography>
                    <Link
                      href={`/products/${product?.productId}`}
                      className="text-decoration-none"
                    >
                      {product?.Product?.name}
                    </Link>
                  </Typography>
                  <Typography>
                    <small>
                      {product?.quantity} item
                      {product?.quantity > 1 ? 's' : null}
                    </small>
                  </Typography>
                </div>
              </Stack>
            </Grid>
            <Grid item sm="auto" xs={12} alignItems="center">
              <Typography className="text-end" flexShrink={1}>
                <b>
                  Rp
                  {(product?.price || product?.Product?.price).toLocaleString(
                    `id-ID`
                  )}
                </b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

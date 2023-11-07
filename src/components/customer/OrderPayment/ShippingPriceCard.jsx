import {
  Card,
  CardContent,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';

export function ShippingPriceCard({ orderData }) {
  return (
    <Card>
      <CardContent>
        <Grid container className="w-100">
          <Grid container className="w-100 flex-row justify-content-between">
            <Grid item flexGrow={1}>
              <Stack direction="row" gap={1} alignItems="center">
                <Typography>Shipping: {orderData?.shippingMethod}</Typography>
              </Stack>
            </Grid>
            <Grid item sm="auto" xs={12} alignItems="center">
              <Typography className="text-end" flexShrink={1}>
                <b>
                  Rp
                  {Number(orderData?.shippingPrice).toLocaleString(`id-ID`)}
                </b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

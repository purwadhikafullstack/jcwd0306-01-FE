import { Stack, Typography, Grid } from '@mui/material';
import { fullAddressFormatter } from '../../Checkout/ModalChooseAddress/fullAddressFormatter';

export function ShippingInfo({ order = {} }) {
  return (
    <Stack gap={1} borderTop="4px solid gainsboro" pt={2} pb={1}>
      <Typography>
        <b>Shipping Information</b>
      </Typography>
      <Grid container>
        <Grid item xs={3}>
          Courier
        </Grid>
        <Grid item xs="auto">
          :
        </Grid>
        <Grid item xs={8.5} ml={1}>
          {order?.shippingMethod}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          Receipt number
        </Grid>
        <Grid item display="flex" xs="auto" alignItems="center">
          :
        </Grid>
        <Grid item display="flex" xs={8.5} alignItems="center" ml={1}>
          {order?.shippingReceipt || '-'}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          Address
        </Grid>
        <Grid item xs="auto">
          :
        </Grid>
        <Grid item ml={1} xs={8.5}>
          <Typography>{order?.UserAddress?.receiverName}</Typography>
          <Typography>{order?.UserAddress?.receiverPhone}</Typography>
          <Typography>{fullAddressFormatter(order?.UserAddress)}</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}

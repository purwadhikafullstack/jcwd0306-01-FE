import { Stack, Typography, Grid } from '@mui/material';

export function WarehouseSender({ order = {} }) {
  return (
    <Stack gap={1} borderTop="4px solid gainsboro" pt={2} pb={1}>
      <Typography>
        <b>Warehouse Sender</b>
      </Typography>
      <Grid container>
        <Grid item xs={3}>
          Name
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
          Admin
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
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, at.
            Tempore unde quo repudiandae voluptate? Dolorem hic possimus
            delectus quibusdam.
          </Typography>
          <Typography>{order?.UserAddress?.receiverPhone}jalan</Typography>
          <Typography>{order?.UserAddress}jalan</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}

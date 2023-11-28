import { Stack, Typography, Grid } from '@mui/material';

export function WarehouseReceiver({ data }) {
  return (
    <Stack gap={1} borderTop="4px solid gainsboro" pt={2} pb={1}>
      <Typography>
        <b>Warehouse Receiver</b>
      </Typography>
      <Grid container>
        <Grid item xs={3}>
          Name
        </Grid>
        <Grid item xs="auto">
          :
        </Grid>
        <Grid item xs={8.5} ml={1}>
          {data?.toWarehouse?.name}
        </Grid>
      </Grid>
      <Grid container display={data?.type === 'order' ? 'none' : ''}>
        <Grid item xs={3}>
          Admin
        </Grid>
        <Grid item display="flex" xs="auto" alignItems="center">
          :
        </Grid>
        <Grid item display="flex" xs={8.5} alignItems="center" ml={1}>
          {data?.requestAdmin?.firstName} {data?.requestAdmin?.lastName}
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
            {data?.toWarehouse?.WarehouseAddress?.City?.name}, &nbsp;
            {data?.toWarehouse?.WarehouseAddress?.Province?.name}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}

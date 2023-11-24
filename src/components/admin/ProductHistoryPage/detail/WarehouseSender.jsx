import { Stack, Typography, Grid } from '@mui/material';

export function WarehouseSender({ data }) {
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
          {data?.fromWarehouse?.name}
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
          {data?.approveAdmin?.firstName} {data?.approveAdmin?.lastName}
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
            {data?.fromWarehouse?.WarehouseAddress?.City?.name}, &nbsp;
            {data?.fromWarehouse?.WarehouseAddress?.Province?.name}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}

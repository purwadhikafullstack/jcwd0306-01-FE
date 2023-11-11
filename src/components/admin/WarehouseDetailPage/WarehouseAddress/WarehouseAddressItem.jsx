import { Grid, Typography } from '@mui/material';
import { string } from 'prop-types';

function WarehouseAddressItem({ label, value }) {
  return (
    <Grid item container xs={12}>
      <Grid item xs={3}>
        <Typography fontWeight={600}>{label}</Typography>
      </Grid>
      <Grid item xs="auto">
        <Typography>{`: ${value}`}</Typography>
      </Grid>
    </Grid>
  );
}

WarehouseAddressItem.propTypes = {
  label: string.isRequired,
  value: string.isRequired,
};

export default WarehouseAddressItem;

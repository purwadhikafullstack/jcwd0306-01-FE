import { Divider, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import ProductImageTab from './ProductImageTab';
import ProductContentStack from './ProductContentStack';
import ProductDetailStack from './ProductDetailStack';
import ProductReportStack from './ProductReportStack';
import ProductActionStack from './ProductActionStack/ProductActionStack';

function ContainerGrid() {
  const product = useSelector((states) => states.product);

  if (product === null) return null;

  return (
    <Grid container spacing={3} sx={{ my: 0 }} rowGap={3}>
      <Grid item xs={12} sm={5} lg={4}>
        <ProductImageTab />
      </Grid>
      <Grid container item xs={12} sm={7} lg={5} gap={3}>
        <Grid item xs={12}>
          <ProductContentStack />
        </Grid>
        <Grid
          item
          xs={12}
          component={Divider}
          sx={{ height: '0.2rem', bgcolor: 'divider' }}
        />
        <Grid item xs={12}>
          <ProductDetailStack />
        </Grid>
        {/* <Grid
          item
          xs={12}
          component={Divider}
          sx={{ height: '0.2rem', bgcolor: 'divider' }}
        />
        <Grid item xs={12}>
          <ProductShipmentStack />
        </Grid> */}
        <Grid
          item
          xs={12}
          component={Divider}
          sx={{ height: '0.2rem', bgcolor: 'divider' }}
        />
        <Grid item xs={12}>
          <ProductReportStack />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} lg={3}>
        <ProductActionStack />
      </Grid>
    </Grid>
  );
}

export default ContainerGrid;

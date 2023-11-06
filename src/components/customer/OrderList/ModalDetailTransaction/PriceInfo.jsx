import { Stack, Typography } from '@mui/material';
import { totalPrice } from './totalPrice';

export function PriceInfo({ order = {} }) {
  const totalSummary = totalPrice(order?.OrderProducts);
  return (
    <Stack gap={1} borderTop="4px solid gainsboro" pt={2} pb={1}>
      <Typography>
        <b>Price Detail</b>
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Typography alignItems="center" display="flex">
          Payment Method
        </Typography>
        <div className="d-md-flex d-sm-block text-end">
          <div>Transfer Bank</div>
          <div>CIMB Niaga</div>
        </div>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>
          Total Price ({totalSummary.totalItem} item
          {totalSummary.totalItem > 1 ? 's' : ''})
        </Typography>
        <Typography textAlign="right">
          Rp{totalSummary.totalPrice.toLocaleString(`id-ID`)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>Shipping Price</Typography>
        <Typography>
          Rp{Number(order?.shippingPrice).toLocaleString(`id-ID`)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>
          <b>Grand Total</b>
        </Typography>
        <Typography>
          <b>Rp{Number(order?.total).toLocaleString(`id-ID`)}</b>
        </Typography>
      </Stack>
    </Stack>
  );
}

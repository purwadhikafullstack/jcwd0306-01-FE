import { Stack } from '@mui/material';

export function TotalPayment({ order = {} }) {
  return (
    <div>
      <Stack className="d-flex d-sm-none">
        <div>Total Payment</div>
        <div>
          <b>Rp{Number(order?.total).toLocaleString(`id-ID`)}</b>
        </div>
      </Stack>
    </div>
  );
}

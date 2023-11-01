import { Stack, Typography } from '@mui/material';
import { constant } from '../../../../constants/constant';

export function StatusInvoice({ order = {} }) {
  return (
    <Stack gap={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography>Status</Typography>
        <Typography
          sx={{
            color: constant[`${order?.status}Color`],
            textTransform: 'capitalize',
          }}
        >
          <b>{order?.status}</b>
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>Invoice number</Typography>
        <Typography>
          INV/
          {String(order?.createdAt).slice(0, 10).replace(/-/g, '')}/{order?.id}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>Transaction date</Typography>
        <Typography>
          {order?.createdAt ? new Date(order?.createdAt).toDateString() : null}
        </Typography>
      </Stack>
    </Stack>
  );
}

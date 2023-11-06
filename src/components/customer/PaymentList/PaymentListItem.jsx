import { Card, CardContent, Grid, Stack } from '@mui/material';
import { HeaderDate } from './HeaderDate';
import { PaymentMethod } from './PaymentMethod';
import { TotalPayment } from './TotalPayment';
import { ActionButton } from './ActionButton';

export function PaymentListItem({ order = {} }) {
  return (
    <Card>
      <CardContent>
        <Stack gap={2}>
          <Grid
            container
            wrap="nowrap"
            className="border-bottom border-secondary-subtle"
          >
            <HeaderDate order={order} />
          </Grid>
          <PaymentMethod order={order} />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <TotalPayment order={order} />
            <ActionButton order={order} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

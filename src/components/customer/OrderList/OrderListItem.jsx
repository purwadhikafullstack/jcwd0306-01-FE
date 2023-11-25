import { Button, Card, CardContent, Grid, Stack } from '@mui/material';
import { HeaderDate } from '../PaymentList/HeaderDate';
import { TotalPayment } from '../PaymentList/TotalPayment';
import { ActionButton } from '../PaymentList/ActionButton';
import { OrderProduct } from './OrderProduct';

export function OrderListItem({ order = {}, setOrderDetail, setOpen }) {
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
          <OrderProduct
            order={order}
            setOrderDetail={setOrderDetail}
            setOpen={setOpen}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <TotalPayment order={order} />
            <ActionButton
              order={order}
              setOrderDetail={setOrderDetail}
              setOpen={setOpen}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { OrderChatTemplate } from '../../components/OrderChatTemplate';
import { PaymentListItem } from '../../components/customer/PaymentList/PaymentListItem';

export function PaymentList() {
  const unpaidOrder = useSelector((state) => state.order);

  return (
    <OrderChatTemplate>
      <h5>Waiting for Payment</h5>
      <Stack direction="column" gap={1} sx={{ fontSize: '0.9em' }}>
        {unpaidOrder.length ? (
          unpaidOrder.map((order) => (
            <PaymentListItem order={order} key={order.id} />
          ))
        ) : (
          <div
            className="w-100 d-flex align-items-center justify-content-center"
            style={{ height: '50vh' }}
          >
            You have no payment to be settled
          </div>
        )}
      </Stack>
    </OrderChatTemplate>
  );
}

import { PaymentHeaderUnpaid } from './PaymentHeaderUnpaid';
import { PaymentHeaderPaid } from './PaymentHeaderPaid';

export function PaymentHeader({ orderData = {} }) {
  if (orderData?.status === 'unpaid')
    return <PaymentHeaderUnpaid orderData={orderData} />;
  if (orderData?.status === 'verifying')
    return <PaymentHeaderPaid orderData={orderData} />;
  if (orderData?.status === 'cancelled' || orderData?.status === 'rejected')
    return (
      <PaymentHeaderPaid
        orderData={orderData}
        expression="Sorry"
        message={`This transaction has been ${orderData?.status}`}
        message2="You can make another transaction"
      />
    );
  if (orderData?.status === 'processed' || orderData?.status === 'shipped')
    return (
      <PaymentHeaderPaid
        orderData={orderData}
        expression="Thank You"
        message={`Your order has been ${orderData?.status}`}
        message2="Happy waiting and shopping"
      />
    );
}

import { Card, Row } from 'react-bootstrap';
import PaymentsIcon from '@mui/icons-material/Payments';
import { PaymentVerificationButton } from './PaymentVerificationButton';
import { OrderProcessedButton } from './OrderProcessedButton';
import { PackageOnDeliveryButton } from './PackageOnDeliveryButton';
import { PackageReceived } from './PackageReceived';

export function NotificationShowUp({ show, setShow, unpaidOrder = [] }) {
  return (
    <Card
      className={
        show ? 'd-none d-md-block position-absolute bg-white p-1' : 'd-none'
      }
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{
        width: '385px',
        left: '50%',
        transform: 'translate(-50%,0)',
        zIndex: 2,
        maxHeight: `400px`,
      }}
    >
      <Row className="m-0 p-2">
        <b>Your Order:</b>
      </Row>
      <Row className="m-0 p-2" style={{ fontSize: '0.9em' }}>
        <a
          className="text-decoration-none text-black d-flex gap-2 align-items-center"
          href="/payment/payment-list"
        >
          <PaymentsIcon color="primary" />
          Waiting for Payment
          <span
            className="bg-danger rounded-circle text-white d-flex align-items-center justify-content-center text-center"
            style={{
              display: unpaidOrder.length ? 'flex' : 'none',
              minWidth: '11px',
              height: '15px',
              fontSize: '11px',
              padding: '0 3px',
            }}
          >
            {unpaidOrder.length}
          </span>
        </a>
      </Row>
      <Row className="m-0 p-2" style={{ fontSize: '0.9em' }}>
        <PaymentVerificationButton />
        <OrderProcessedButton />
        <PackageOnDeliveryButton />
        <PackageReceived />
      </Row>
    </Card>
  );
}

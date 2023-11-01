import { Card, Col, Row } from 'react-bootstrap';
import PaymentsIcon from '@mui/icons-material/Payments';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import UpdateIcon from '@mui/icons-material/Update';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HandshakeIcon from '@mui/icons-material/Handshake';

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
            className="bg-danger rounded-circle text-white align-items-center justify-content-center text-center"
            style={{
              display: unpaidOrder.length ? 'flex' : 'none',
              minWidth: '16px',
              maxHeight: '16px',
              padding: unpaidOrder.length > 9 ? '0 2px' : '0',
            }}
          >
            {unpaidOrder.length}
          </span>
        </a>
      </Row>
      <Row className="m-0 p-2" style={{ fontSize: '0.9em' }}>
        <Col
          md={3}
          className="p-1 d-flex align-items-start text-center justify-content-center"
        >
          <a
            className="text-decoration-none text-black d-flex flex-column align-items-center"
            href="/order-list?status=verifying"
          >
            <FactCheckIcon color="primary" />
            Payment Verification
          </a>
        </Col>
        <Col
          md={3}
          className="p-1 d-flex align-items-start text-center justify-content-center"
        >
          <a
            className="text-decoration-none text-black d-flex flex-column align-items-center"
            href="/order-list?status=processed"
          >
            <UpdateIcon color="primary" />
            Order Processed
          </a>
        </Col>
        <Col
          md={3}
          className="p-1 d-flex align-items-start text-center justify-content-center"
        >
          <a
            className="text-decoration-none text-black d-flex flex-column align-items-center"
            href="/order-list?status=sent"
          >
            <LocalShippingIcon color="primary" />
            Package On Delivery
          </a>
        </Col>
        <Col
          md={3}
          className="p-1 d-flex align-items-start text-center justify-content-center"
        >
          <a
            className="text-decoration-none text-black d-flex flex-column align-items-center"
            href="/order-list?status=received"
          >
            <HandshakeIcon color="primary" />
            Package Received
          </a>
        </Col>
      </Row>
    </Card>
  );
}

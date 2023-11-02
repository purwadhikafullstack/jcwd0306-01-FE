import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export function PackageOnDeliveryButton() {
  const orderStatus = useSelector((state) => state.orderStatus);
  return (
    <Col
      md={3}
      className="p-1 d-flex align-items-start text-center justify-content-center"
    >
      <a
        className="text-decoration-none text-black d-flex flex-column align-items-center position-relative"
        href="/order-list?status=ongoing&substatus=shipped"
      >
        <span
          className="text-light text-center position-absolute bg-danger z-2 text-decoration-none rounded-pill"
          style={{
            top: '-8px',
            left: '57%',
            minWidth: '11px',
            height: '15px',
            fontSize: '11px',
            padding: '0 3px',
            display: orderStatus?.shipped ? 'block' : 'none',
          }}
        >
          {orderStatus?.shipped}
        </span>
        <LocalShippingIcon color="primary" />
        Package On Delivery
      </a>
    </Col>
  );
}

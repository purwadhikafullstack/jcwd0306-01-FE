import { Col, Row } from 'react-bootstrap';

export function CartItemLine({ item }) {
  return (
    <Row className="m-0">
      <a href="/" className="text-decoration-none text-black">
        <Row className="m-0 px-1 py-2 border-top border-secondary-subtle">
          <Col className="p-0" md="auto" key={1}>
            <img
              src="https://t3.ftcdn.net/jpg/04/46/38/74/360_F_446387449_OIIQ3VlDKbMQTM63yVJNpks6UecfVAhD.jpg"
              alt={`img_${item.Product.name}`}
              style={{ width: '40px' }}
            />
          </Col>
          <Col className="px-1 py-0" key={2}>
            <div className="text-truncate">
              <b>{item.Product.name}</b>
            </div>
            <div style={{ fontSize: '10px' }}>
              {item.quantity} item{item.quantity > 1 ? `s` : null} (
              {item.Product.weight} gr)
            </div>
          </Col>
          <Col
            md="auto"
            className="text-warning d-flex align-items-center p-0 text-end"
            style={{ height: `inherit` }}
            key={3}
          >
            Rp{item.Product.price.toLocaleString(`id-ID`)}
          </Col>
        </Row>
      </a>
    </Row>
  );
}

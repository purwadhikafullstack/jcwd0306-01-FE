import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export function CartShowUp({ showCart, setShowCart }) {
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartItems(cart);
  }, [cart.length]);
  return (
    <Card
      className={
        showCart ? 'd-none d-md-block position-absolute bg-white p-1' : 'd-none'
      }
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
      style={{
        width: '400px',
        left: '50%',
        transform: 'translate(-50%,0)',
        zIndex: 2,
      }}
    >
      <Row className="m-0 p-2">Keranjang ({cart.length})</Row>
      {cartItems.map((item) => (
        <Row
          className="m-0 px-1 py-2 border-top border-secondary-subtle"
          key={item.productId}
        >
          <Col className="p-0" md="auto">
            <img
              src="https://t3.ftcdn.net/jpg/04/46/38/74/360_F_446387449_OIIQ3VlDKbMQTM63yVJNpks6UecfVAhD.jpg"
              alt={`img_${item.productName}`}
              style={{ width: '40px' }}
            />
          </Col>
          <Col className="px-1 py-0">
            <div className="text-truncate">
              <b>{item.productName}</b>
            </div>
            <div style={{ fontSize: '10px' }}>
              {item.quantity} item{item.quantity > 1 ? `s` : null} (
              {item.weight} gr)
            </div>
          </Col>
          <Col
            md="auto"
            className="text-warning d-flex align-items-center p-0 text-end"
            style={{ height: `inherit` }}
          >
            Rp{item.price.toLocaleString(`id-ID`)}
          </Col>
        </Row>
      ))}
    </Card>
  );
}

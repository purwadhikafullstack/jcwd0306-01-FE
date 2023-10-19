import { Card, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CartItemLine } from './CartItemLine';

export function CartShowUp({ showCart, setShowCart }) {
  const cart = useSelector((state) => state.cart);

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
        maxHeight: `400px`,
      }}
    >
      <Row className="m-0 p-2">
        <a href="/cart" className="text-decoration-none text-secondary">
          {cart.length === 0 ? (
            <span className="text-center">Empty</span>
          ) : (
            `Your Cart (${cart.length})`
          )}
        </a>
      </Row>
      {cart.map((item) => (
        <CartItemLine item={item} key={item.productId} />
      ))}
    </Card>
  );
}

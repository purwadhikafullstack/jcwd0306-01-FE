import '../../components/customer/Cart/Cart.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { CartItemList } from '../../components/customer/Cart/CartItemList';
import { StackBorder } from '../../components/customer/Cart/StackBorder';
import { CartHeader } from '../../components/customer/Cart/CartHeader';
import { ShoppingSummary } from '../../components/customer/Cart/ShoppingSummary';
import checkBoxHandler from '../../utils/checkBoxHandler';
import { MobileShoppingSummary } from '../../components/customer/Cart/MobileShoppingSummary';

function Cart() {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    checkBoxHandler(`cart-item-checkboxes`, `check-all-products`);
  }, [cart]);

  return (
    <Container className="mx-auto p-0 mt-3" fluid="lg">
      <Row
        className="m-0 d-flex justify-content-center"
        style={{ minHeight: '82vh' }}
      >
        <Col lg={7} md={7} className="d-flex flex-column gap-3">
          <CartHeader />
          <StackBorder />
          {cart.length
            ? cart.map((product) => (
                <CartItemList product={product} cart={cart} />
              ))
            : 'No Items on Cart'}
        </Col>
        <Col lg={4} md={5} className="position-relative d-none d-md-block">
          <ShoppingSummary />
        </Col>
      </Row>
      <div className="sticky-bottom d-sm-block d-md-none bg-white px-2 pt-1 pb-3 border-top border-secondary-subtle h-100">
        <MobileShoppingSummary />
      </div>
    </Container>
  );
}

export { Cart };

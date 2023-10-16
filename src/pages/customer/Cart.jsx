import '../../components/customer/Cart/Cart.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateCart } from '../../states/cart/action';
import { CartItemList } from '../../components/customer/Cart/CartItemList';
import { StackBorder } from '../../components/customer/Cart/StackBorder';
import { CartHeader } from '../../components/customer/Cart/CartHeader';
import { ShoppingSummary } from '../../components/customer/Cart/ShoppingSummary';
import { setAlertActionCreator } from '../../states/alert/action';
import checkBoxHandler from '../../utils/checkBoxHandler';
import { MobileShoppingSummary } from '../../components/customer/Cart/MobileShoppingSummary';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  async function addItem(id) {
    const result = await dispatch(
      updateCart(
        [...cart],
        {
          productId: id,
          productName: 'Aneh',
          price: 20000,
          quantity: 5,
          discount: 1000,
          weight: 200,
          isChecked: false,
        },
        1
      )
    );
    if (result !== `SUCCESS`)
      dispatch(
        setAlertActionCreator({ val: { status: 'error', message: result } })
      );
  }

  useEffect(() => {
    checkBoxHandler(`cart-item-checkboxes`, `check-all-products`);
  }, [cart]);

  return (
    <Container className="mx-auto p-0 mt-3" fluid="lg">
      <Row
        className="m-0 d-flex justify-content-center"
        style={{ minHeight: '77vh' }}
      >
        <Col lg={7} md={7} className="d-flex flex-column gap-3">
          <div>
            <button
              onClick={() => {
                addItem(1);
                addItem(2);
                addItem(3);
                addItem(4);
                addItem(5);
                addItem(6);
              }}
            >
              Dummy Add Item to Card
            </button>
            <button onClick={() => addItem(7)}>Dummy Add Item to Card</button>
          </div>
          <CartHeader />
          <StackBorder />
          {cart.length
            ? cart.map((product, index) => (
                <CartItemList product={product} cart={cart} />
              ))
            : 'No Items on Cart'}
        </Col>
        <Col lg={4} md={4} className="position-relative d-none d-md-block">
          <ShoppingSummary />
        </Col>
      </Row>
      <div className="sticky-bottom d-sm-block d-md-none bg-white px-2 pt-1 pb-3 border-top border-secondary-subtle">
        <MobileShoppingSummary />
      </div>
    </Container>
  );
}

export { Cart };

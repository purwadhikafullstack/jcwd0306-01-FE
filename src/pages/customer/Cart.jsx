import '../../components/customer/Cart/Cart.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateCart } from '../../states/cart/action';
import { CartItemList } from '../../components/customer/Cart/CartItemList';
import { StackBorder } from '../../components/customer/Cart/StackBorder';
import { CartHeader } from '../../components/customer/Cart/CartHeader';
import { ShoppingSummary } from '../../components/customer/Cart/ShoppingSummary';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  async function addItem(id) {
    await dispatch(
      updateCart(
        [...cart],
        {
          productId: id,
          productName: 'Aneh',
          price: 20000,
          quantity: 1,
          discount: 1000,
          weight: 200,
          isChecked: false,
        },
        1
      )
    );
  }
  const [summaryTransaction, setSummaryTransaction] = useState({
    totalPrice: 0,
    totalDiscount: 0,
    items: [],
  });

  return (
    <Container className="mx-auto p-0 mt-3">
      <Row className="m-0 d-flex justify-content-center">
        <Col lg={7} className="d-flex flex-column gap-3">
          <button onClick={() => addItem(5)}>Dummy Add Item to Card</button>
          <button onClick={() => addItem(6)}>Dummy Add Item to Card</button>
          <CartHeader />
          <StackBorder />
          {cart.length
            ? cart.map((product, index) => (
                <CartItemList
                  product={product}
                  index={index}
                  summaryTransaction={summaryTransaction}
                  setSummaryTransaction={setSummaryTransaction}
                  cart={cart}
                />
              ))
            : 'No Items on Cart'}
        </Col>
        <Col lg={4} className="position-relative d-none d-md-block">
          <ShoppingSummary summaryTransaction={summaryTransaction} />
        </Col>
      </Row>
    </Container>
  );
}

export { Cart };

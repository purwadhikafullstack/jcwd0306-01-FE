import '../../components/customer/Cart/Cart.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CartItemList } from '../../components/customer/Cart/CartItemList';
import { StackBorder } from '../../components/customer/Cart/StackBorder';
import { CartHeader } from '../../components/customer/Cart/CartHeader';
import { ShoppingSummary } from '../../components/customer/Cart/ShoppingSummary';
import checkBoxHandler from '../../utils/checkBoxHandler';
import { MobileShoppingSummary } from '../../components/customer/Cart/MobileShoppingSummary';
import {
  cartCalculator,
  grandTotalCalculator,
} from '../../components/customer/Cart/cartCalculator';
import { checkStockToQuantity } from '../../components/customer/Cart/checkStockToQuantity';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const summaryTransaction = new Map([
    [`totalItems`, { amount: 0, name: `Total Items` }],
    [`totalPrice`, { amount: 0, name: `Total Price` }],
    [`totalDiscount`, { amount: 0, name: `Total Discount` }],
    [`shipmentPrice`, { amount: 0, name: `Shipment Price` }],
    [`shipmentPriceDiscount`, { amount: 0, name: `Shipment Price Discount` }],
    ['shippingInsurance', { amount: 0, name: `Shipping Insurance Price` }],
    [`servicePrice`, { amount: 0, name: `Service Price` }],
  ]);
  cartCalculator(cart, summaryTransaction, {}, {});
  const grandTotal = grandTotalCalculator(summaryTransaction);

  const checkQuantityToStock = () => checkStockToQuantity(dispatch, nav, cart);

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
          {cart.length ? (
            cart.map((product) => (
              <CartItemList
                product={product}
                cart={cart}
                key={product.productId}
              />
            ))
          ) : (
            <div className="w-100 d-flex flex-column gap-4 justify-content-center align-items-center">
              <div>No Items on Cart</div>
              <div>
                <Button variant="contained">
                  <a href="/" className="text-decoration-none text-white">
                    Start shopping
                  </a>
                </Button>
              </div>
            </div>
          )}
        </Col>
        <Col lg={4} md={5} className="position-relative d-none d-md-block">
          <ShoppingSummary
            summaryTransaction={summaryTransaction}
            grandTotal={grandTotal}
            createNewOrder={checkQuantityToStock}
          />
        </Col>
      </Row>
      <div className="sticky-bottom d-sm-block d-md-none bg-white px-2 pt-1 pb-3 border-top border-secondary-subtle h-100">
        <MobileShoppingSummary
          summaryTransaction={summaryTransaction}
          grandTotal={grandTotal}
          createNewOrder={checkQuantityToStock}
        />
      </div>
    </Container>
  );
}

export { Cart };

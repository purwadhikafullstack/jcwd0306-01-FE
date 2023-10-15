import '../../components/customer/Cart/Cart.css';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CartItemList } from '../../components/customer/Cart/CartItemList';
import { StackBorder } from '../../components/customer/Cart/StackBorder';

import { ShoppingSummary } from '../../components/customer/Cart/ShoppingSummary';
import { Address } from '../../components/customer/Checkout/Address';

export function Checkout() {
  const [products, setProducts] = useState([]);
  const [summaryTransaction, setSummaryTransaction] = useState({
    totalPrice: 0,
    totalDiscount: 0,
  });

  return (
    <Container className="mx-auto p-0">
      <Row className="m-0 d-flex justify-content-center">
        <Col lg={7} className="d-flex flex-column gap-3">
          <div className="fw-bold">CHECK OUT</div>
          <div>
            <div>Shipping address</div>
            <hr />
            <Address />
          </div>
          <StackBorder />
          {products.length
            ? products.map((product, index) => (
                <CartItemList
                  product={product}
                  index={index}
                  summaryTransaction={summaryTransaction}
                  setSummaryTransaction={setSummaryTransaction}
                />
              ))
            : null}
        </Col>
        <Col lg={4} className="position-relative d-none d-md-block">
          <ShoppingSummary summaryTransaction={summaryTransaction} />
        </Col>
      </Row>
    </Container>
  );
}

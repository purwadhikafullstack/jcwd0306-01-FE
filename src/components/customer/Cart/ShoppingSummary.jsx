import { Button, Card, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StackBorder } from './StackBorder';
import './Cart.css';
import '../../GlobalCSS.css';
import { cartCalculator } from './cartCalculator';

export function ShoppingSummary({ address }) {
  const directBuyItem = useLocation().state;
  const cart = useSelector((state) => state.cart);
  const summaryTransaction = new Map([
    [`totalPrice`, 0],
    [`totalDiscount`, 0],
    [`totalItems`, 0],
  ]);
  cartCalculator(cart, summaryTransaction, directBuyItem);
  const totalPrice = summaryTransaction.get(`totalPrice`);
  const totalDiscount = summaryTransaction.get(`totalDiscount`);

  return (
    <Card className="p-1 card-summary">
      <Card.Header style={{ borderRadius: '45px 45px 0 0' }}>
        Shopping Summary
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item className="px-0">
            <span>Total Price:</span>
            <span className="float-end text-right">
              Rp{totalPrice.toLocaleString(`id-ID`)}
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <span>Discount:</span>
            <span className="float-end text-right">
              Rp
              {totalDiscount.toLocaleString(`id-ID`)}
            </span>
          </ListGroup.Item>
          <StackBorder />
          <ListGroup.Item className="px-0">
            <span>Grand total:</span>
            <span className="float-end text-right">
              Rp
              {(totalDiscount + totalPrice).toLocaleString(`id-ID`)}
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">Promo Code: takada</ListGroup.Item>
        </ListGroup>
        <a href="/cart/shipment">
          <Button className="normal-button">
            {window.location.pathname === '/cart'
              ? 'Proceed'
              : 'Payment Option'}
          </Button>
        </a>
      </Card.Body>
    </Card>
  );
}

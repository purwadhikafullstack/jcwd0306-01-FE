import { Button, Card, ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StackBorder } from './StackBorder';
import './Cart.css';
import '../../GlobalCSS.css';

export function ShoppingSummary() {
  const { transactionItems } = useLocation();
  const nav = useNavigate();
  const cart = useSelector((state) => state.cart);
  const summaryTransaction = new Map([
    [`totalPrice`, 0],
    [`totalDiscount`, 0],
  ]);

  cart.forEach((item) => {
    if (item.isChecked) {
      summaryTransaction.set(
        `totalPrice`,
        summaryTransaction.get(`totalPrice`) +
          item.Product.price * item.quantity
      );
      summaryTransaction.set(
        `totalDiscount`,
        summaryTransaction.get(`totalDiscount`) +
          item.Product.discount * item.quantity
      );
    }
  });

  const totalPrice = summaryTransaction.get(`totalPrice`);
  const totalDiscount = summaryTransaction.get(`totalDiscount`);

  const handleProceed = () => {
    if (window.location.pathname === `/cart`)
      return nav('/cart/shipment', {
        transactionItems: [cart.filter((item) => item.isChecked)],
      });
    // send to API create transaction
  };

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
        <Button className="normal-button" onClick={handleProceed}>
          {window.location.pathname === '/cart' ? 'Proceed' : 'Payment Option'}
        </Button>
      </Card.Body>
    </Card>
  );
}

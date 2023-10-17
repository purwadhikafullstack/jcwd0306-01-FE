import { Button, Card, ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StackBorder } from './StackBorder';
import './Cart.css';
import '../../GlobalCSS.css';

export function ShoppingSummary({ summaryTransaction }) {
  const { transactionItems } = useLocation();

  const nav = useNavigate();
  const cart = useSelector((state) => state.cart);
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
              Rp{summaryTransaction.totalPrice.toLocaleString(`id-ID`)}
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <span>Discount:</span>
            <span className="float-end text-right">
              Rp
              {summaryTransaction.totalDiscount.toLocaleString(`id-ID`)}
            </span>
          </ListGroup.Item>
          <StackBorder />
          <ListGroup.Item className="px-0">
            <span>Grand total:</span>
            <span className="float-end text-right">
              Rp
              {(
                summaryTransaction.totalDiscount + summaryTransaction.totalPrice
              ).toLocaleString(`id-ID`)}
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

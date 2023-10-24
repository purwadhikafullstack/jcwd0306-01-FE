import { Button, Card, ListGroup } from 'react-bootstrap';
import './Cart.css';
import '../../GlobalCSS.css';

export function ShoppingSummary({
  address,
  disableButton,
  shippingMethod,
  cart,
  summaryTransaction,
  grandTotal,
  directBuyItem,
}) {
  return (
    <Card className="p-1 card-summary">
      <Card.Header style={{ borderRadius: '45px 45px 0 0' }}>
        Shopping Summary
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {[...summaryTransaction.keys()].map((key) =>
            summaryTransaction.get(key).amount ? (
              <ListGroup.Item
                className="px-0"
                key={summaryTransaction.get(key).name}
              >
                <span>{summaryTransaction.get(key).name}</span>
                <span className="float-end text-right">
                  {key !== 'totalItems'
                    ? `Rp${summaryTransaction
                        .get(key)
                        .amount.toLocaleString(`id-ID`)}`
                    : `${summaryTransaction
                        .get(key)
                        .amount.toLocaleString(`id-ID`)} items`}
                </span>
              </ListGroup.Item>
            ) : null
          )}
          <ListGroup.Item className="px-0">
            <span>Grand Total:</span>
            <span className="float-end text-right">
              Rp{grandTotal.toLocaleString(`id-ID`)}
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">Promo Code: takada</ListGroup.Item>
        </ListGroup>

        <Button disabled={disableButton} className="normal-button">
          <a href="/cart/shipment" className="text-white text-decoration-none">
            {window.location.pathname === '/cart'
              ? 'Proceed'
              : 'Payment Option'}
          </a>
        </Button>
      </Card.Body>
    </Card>
  );
}

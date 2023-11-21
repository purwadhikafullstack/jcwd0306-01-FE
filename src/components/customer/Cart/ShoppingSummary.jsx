import { Card, ListGroup } from 'react-bootstrap';
import './Cart.css';
import '../../GlobalCSS.css';
import { ButtonShoppingSummary } from './ButtonShoppingSummary';

export function ShoppingSummary({
  disableButton,
  summaryTransaction,
  grandTotal,
  createNewOrder,
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
                    ? `${
                        key === 'totalDiscount' ? '-' : ''
                      }Rp${summaryTransaction
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
        <ButtonShoppingSummary
          disableButton={disableButton}
          createNewOrder={createNewOrder}
        />
      </Card.Body>
    </Card>
  );
}

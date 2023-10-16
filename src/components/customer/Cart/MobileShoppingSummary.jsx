import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../../GlobalCSS.css';

export function MobileShoppingSummary() {
  const cart = useSelector((state) => state.cart).filter(
    (item) => item.isChecked
  );
  const summaryTransaction = new Map([
    [`totalPrice`, 0],
    [`totalDiscount`, 0],
  ]);

  cart.forEach((item) => {
    summaryTransaction.set(
      `totalPrice`,
      summaryTransaction.get(`totalPrice`) + item.price * item.quantity
    );
    summaryTransaction.set(
      `totalDiscount`,
      summaryTransaction.get(`totalDiscount`) + item.discount * item.quantity
    );
  });

  return (
    <div>
      <div />
      <div className="d-flex justify-content-between">
        <div>
          <div style={{ fontSize: '12px' }}>Total Price:</div>
          <div>
            <b>
              Rp
              {(
                summaryTransaction.get(`totalPrice`) -
                summaryTransaction.get(`totalDiscount`)
              ).toLocaleString(`id-ID`)}
            </b>
          </div>
        </div>
        <Button className="normal-button">Proceed</Button>
      </div>
    </div>
  );
}

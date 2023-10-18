import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import '../../GlobalCSS.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import MobileShoppingSummaryDialog from './MobileShoppingSummaryDialog';
import { cartCalculator } from './cartCalculator';

export function MobileShoppingSummary({ address }) {
  const [show, setShow] = useState(false);
  const directBuyItem = useLocation().state;
  const cart = useSelector((state) => state.cart).filter(
    (item) => item.isChecked
  );
  const summaryTransaction = new Map([
    [`totalPrice`, 0],
    [`totalDiscount`, 0],
    [`totalItems`, 0],
  ]);
  cartCalculator(cart, summaryTransaction, directBuyItem);
  const totalPrice = summaryTransaction.get(`totalPrice`);
  const totalDiscount = summaryTransaction.get(`totalDiscount`);

  return (
    <div>
      <MobileShoppingSummaryDialog
        open={show}
        setOpen={setShow}
        summaryTransaction={summaryTransaction}
      />
      <div />
      <div className="d-flex justify-content-between">
        <div
          className="d-flex align-items-end gap-2"
          onClick={() => setShow(true)}
        >
          <div>
            <div style={{ fontSize: '12px' }}>Total Price:</div>
            <div>
              <b>
                Rp
                {(totalPrice - totalDiscount).toLocaleString(`id-ID`)}
              </b>
            </div>
          </div>
          <div className="h-100 d-flex align-items-center">
            <KeyboardArrowUpIcon />
          </div>
        </div>
        <a href="/cart/shipment">
          <Button className="normal-button">Proceed</Button>
        </a>
      </div>
    </div>
  );
}

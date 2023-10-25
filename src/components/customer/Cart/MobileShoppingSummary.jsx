import { Button } from 'react-bootstrap';
import '../../GlobalCSS.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import MobileShoppingSummaryDialog from './MobileShoppingSummaryDialog';

export function MobileShoppingSummary({
  disableButton,
  summaryTransaction,
  grandTotal,
  createNewOrder,
}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <MobileShoppingSummaryDialog
        open={show}
        setOpen={setShow}
        summaryTransaction={summaryTransaction}
        grandTotal={grandTotal}
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
                {grandTotal.toLocaleString(`id-ID`)}
              </b>
            </div>
          </div>
          <div className="h-100 d-flex align-items-center">
            <KeyboardArrowUpIcon />
          </div>
        </div>
        <Button disabled={disableButton} className="normal-button">
          <a href="/cart/shipment" className="text-white text-decoration-none">
            Proceed
          </a>
        </Button>
      </div>
    </div>
  );
}

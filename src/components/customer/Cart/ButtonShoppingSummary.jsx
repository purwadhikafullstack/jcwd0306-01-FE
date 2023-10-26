import { Button } from 'react-bootstrap';
import '../../GlobalCSS.css';

export function ButtonShoppingSummary({ disableButton, createNewOrder }) {
  return (
    <Button
      disabled={disableButton}
      className="normal-button"
      onClick={() => createNewOrder()}
    >
      <span className="text-white text-decoration-none">Payment</span>
    </Button>
  );
}

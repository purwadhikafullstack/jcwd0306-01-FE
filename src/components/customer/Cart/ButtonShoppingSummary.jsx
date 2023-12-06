import { Button } from 'react-bootstrap';
import '../../GlobalCSS.css';
import { useState } from 'react';
import { ConfirmationModal } from '../../ConfirmationModal';

export function ButtonShoppingSummary({ disableButton, createNewOrder }) {
  const [show, setShow] = useState('');
  if (window.location.pathname === '/cart/shipment')
    return (
      <>
        <Button
          disabled={disableButton}
          className="normal-button"
          onClick={() => setShow('Payment')}
        >
          <span className="text-white text-decoration-none">Payment</span>
        </Button>{' '}
        <ConfirmationModal
          action={createNewOrder}
          actionName="proceed to payment?"
          show={show}
          setShow={setShow}
        />
      </>
    );
  return (
    <Button
      disabled={disableButton}
      className="normal-button"
      onClick={() => createNewOrder()}
    >
      <span className="text-white text-decoration-none">Choose Address</span>
    </Button>
  );
}

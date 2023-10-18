import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { Address } from './Address';
import ModalChooseAddress from './ModalChooseAddress';
import { ModalEditAndAddAddress } from './ModalEditAndAddAddress';

export function CheckOutHeader({
  addresses,
  setAddresses,
  address,
  setAddress,
}) {
  const [showModal, setShowModal] = useState('');

  return (
    <>
      <div className="fw-bold mt-2">CHECK OUT</div>
      <div className="border-bottom border-secondary-subtle">
        <div>Shipping address</div>
        <hr />
        <Address address={address} />
      </div>
      <div className="d-flex gap-2">
        <Button
          variant="light"
          onClick={() => {
            setShowModal('CHOOSE_ADDRESS');
          }}
        >
          Choose Address
        </Button>
        <Button variant="light">Multiple Addresses</Button>
      </div>
      <ModalChooseAddress
        open={showModal}
        setOpen={setShowModal}
        addresses={addresses}
        setAddress={setAddress}
        setAddresses={setAddresses}
      />
      <ModalEditAndAddAddress open={showModal} setOpen={setShowModal} />
    </>
  );
}

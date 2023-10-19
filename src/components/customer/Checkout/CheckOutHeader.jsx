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
  const [addressToEdit, setAddressToEdit] = useState({});

  return (
    <>
      <div className="fw-bold mt-2">CHECK OUT</div>
      <div className="border-bottom border-secondary-subtle">
        <div>Shipping address</div>
        <hr />
        {address?.id ? (
          <Address address={address} />
        ) : (
          <div className="mb-3">No address found</div>
        )}
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
        setAddressToEdit={setAddressToEdit}
      />
      <ModalEditAndAddAddress
        open={showModal}
        setOpen={setShowModal}
        addressToEdit={addressToEdit}
      />
    </>
  );
}

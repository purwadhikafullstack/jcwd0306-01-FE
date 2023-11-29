import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Address } from './Address';
import ModalChooseAddress from './ModalChooseAddress';
import { ModalEditAndAddAddress } from './ModalEditAndAddAddress';
import ShippingSelect from './ShippingSelect';

export function CheckOutHeader({
  addresses,
  setAddresses,
  address,
  setAddress,
  shippingOptions,
  shippingMethod,
  setShippingMethod,
  originWarehouse,
  disableButton,
  isLoading,
  setName,
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
      <div className="d-flex flex-wrap gap-2 justify-content-even">
        <div className="d-flex gap-2 align-items-center">
          <Button
            variant="light"
            className="h-100"
            onClick={() => {
              setShowModal('CHOOSE_ADDRESS');
            }}
          >
            Choose Address
          </Button>
          <div className="d-flex align-items-center">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <ShippingSelect
                shippingOptions={shippingOptions}
                shippingMethod={shippingMethod}
                setShippingMethod={setShippingMethod}
                disableButton={disableButton}
              />
            )}
          </div>
          <ModalChooseAddress
            open={showModal}
            setOpen={setShowModal}
            address={address}
            addresses={addresses}
            setAddress={setAddress}
            setAddresses={setAddresses}
            setAddressToEdit={setAddressToEdit}
            setShippingMethod={setShippingMethod}
            setName={setName}
          />
          <ModalEditAndAddAddress
            open={showModal}
            setOpen={setShowModal}
            addresses={addresses}
            addressToEdit={addressToEdit}
            setAddress={setAddress}
            setAddresses={setAddresses}
            setAddressToEdit={setAddressToEdit}
          />
        </div>
        <div style={{ fontSize: '0.9em' }}>
          <div className={isLoading ? 'd-none' : ''}>
            <b>Sent From</b>: {originWarehouse?.city_name}
          </div>
          {shippingMethod?.name ? (
            <>
              <div>Shipping method: {shippingMethod?.name}</div>
              <div>Delivery time estimation: {shippingMethod?.etd}</div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

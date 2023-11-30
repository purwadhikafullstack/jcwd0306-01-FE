import { fullAddressFormatter } from './ModalChooseAddress/fullAddressFormatter';

export function Address({ location = 'checkout', address }) {
  return (
    <div className="d-flex flex-column gap-1">
      {location === 'checkout_modal' ? (
        <div className="text-secondary">({address?.addressName})</div>
      ) : null}
      <div className="d-flex gap-2">
        <span>
          <b>{address?.receiverName}</b>
        </span>
        {location === 'checkout' ? <span>({address?.addressName})</span> : null}
      </div>
      <div style={{ fontSize: '0.9em' }}>{address?.receiverPhone}</div>
      <p style={{ fontSize: '0.9em' }}>{fullAddressFormatter(address)}</p>
    </div>
  );
}

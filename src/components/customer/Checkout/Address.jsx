import { useEffect, useState } from 'react';

export function Address({ location = 'checkout', address }) {
  const [destination, setDestination] = useState({});

  useEffect(() => {
    setDestination(address);
  }, [address?.detail]);

  return (
    <div className="d-flex flex-column gap-1">
      {location === 'checkout_modal' ? (
        <div className="text-secondary">({destination?.addressName})</div>
      ) : null}
      <div className="d-flex gap-2">
        <span>
          <b>{destination?.receiverName}</b>
        </span>
        {location === 'checkout' ? (
          <span>({destination?.addressName})</span>
        ) : null}
      </div>
      <div style={{ fontSize: '0.9em' }}>{destination?.receiverPhone}</div>
      <p style={{ fontSize: '0.9em' }}>
        {[
          destination?.detail,
          destination?.village,
          destination?.district,
          `${destination?.City?.name} ${destination?.postalCode}`,
          destination?.Province?.name,
        ].join(`, `)}
      </p>
    </div>
  );
}

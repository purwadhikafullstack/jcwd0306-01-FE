export const fullAddressFormatter = (destination) =>
  [
    destination?.detail,
    destination?.village,
    destination?.district,
    `${destination?.City?.name} ${destination?.postalCode}`,
    destination?.Province?.name,
  ].join(`, `);

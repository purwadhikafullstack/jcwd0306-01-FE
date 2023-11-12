export function Roles({ val, whAdmin }) {
  const isWarehouseAdmin = whAdmin.some((value) => val.id === value.User.id);

  let roleLabel;

  if (val.isAdmin) {
    roleLabel = 'Super Admin';
  } else if (isWarehouseAdmin) {
    roleLabel = 'Warehouse Admin';
  } else {
    roleLabel = 'Customer';
  }

  return <div>{roleLabel}</div>;
}

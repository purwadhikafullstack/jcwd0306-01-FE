import { useState } from 'react';

export function Roles({ val, whAdmin }) {
  const [whAdminRole, setWhAdminRole] = useState(null);
  //   console.log(val.isAdmin);
  /*  whAdmin.map((value) => {
    // console.log(value.User.id);
    if (val.id === value.User.id) {
      return <>Warehouse Admin</>;
    }
  }); */

  const isWarehouseAdmin = whAdmin.some((value) => val.id === value.User.id);
  console.log(isWarehouseAdmin);

  return (
    <>
      {val.isAdmin
        ? 'Super Admin'
        : isWarehouseAdmin
        ? 'Warehouse Admin'
        : 'Customer'}
    </>
  );
}

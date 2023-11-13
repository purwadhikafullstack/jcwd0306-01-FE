import { useSelector } from 'react-redux';
import WarehouseAddressContainer from './WarehouseAddress/WarehouseAddressContainer';
import WarehouseProductContainer from './WarehouseProduct/WarehouseProductContainer';

function Container() {
  const authUser = useSelector((states) => states.authUser);
  const warehouse = useSelector((states) => states.warehouse);
  return (
    <>
      <WarehouseAddressContainer />
      {(authUser.isAdmin ||
        authUser.WarehouseUser[0]?.warehouseId === warehouse.id) && (
        // Only super admin or warehouse admin can see this component
        <WarehouseProductContainer />
      )}
    </>
  );
}

export default Container;

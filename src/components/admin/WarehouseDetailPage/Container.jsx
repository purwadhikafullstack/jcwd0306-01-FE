import { useSelector } from 'react-redux';
import { TabContext } from '@mui/lab';
import { useSearchParams } from 'react-router-dom';
import WarehouseAddressContainer from './WarehouseAddress/WarehouseAddressContainer';
import WarehouseProductContainer from './WarehouseProduct/WarehouseProductContainer';
import TabList from './TabList';
import TabPanel from './TabPanel';

function Container() {
  const authUser = useSelector((states) => states.authUser);
  const warehouse = useSelector((states) => states.warehouse);
  const [searchParams] = useSearchParams();
  return (
    <TabContext value={searchParams.get('tab')}>
      <TabList />
      {(authUser.isAdmin ||
        authUser.WarehouseUsers[0]?.warehouseId === warehouse.id) && (
        // Only super admin or warehouse admin can see this component
        <TabPanel value="products">
          <WarehouseProductContainer />
        </TabPanel>
      )}
      <TabPanel value="information">
        <WarehouseAddressContainer />
      </TabPanel>
    </TabContext>
  );
}

export default Container;

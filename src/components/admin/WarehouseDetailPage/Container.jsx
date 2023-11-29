import { useSelector } from 'react-redux';
import { TabContext, TabPanel } from '@mui/lab';
import { useSearchParams } from 'react-router-dom';
import WarehouseAddressContainer from './WarehouseAddress/WarehouseAddressContainer';
import WarehouseProductContainer from './WarehouseProduct/WarehouseProductContainer';
import TabList from './TabList';
import StockMutationContainer from './StockMutation/StockMutationContainer';

function Container() {
  const authUser = useSelector((states) => states.authUser);
  const warehouse = useSelector((states) => states.warehouse);
  const [searchParams] = useSearchParams();

  return (
    <TabContext value={searchParams.get('tab') || 'information'}>
      <TabList />
      <TabPanel value="information">
        <WarehouseAddressContainer />
      </TabPanel>
      {(authUser.isAdmin ||
        authUser.WarehouseUser.warehouseId === warehouse.id) && (
        // Only super admin or warehouse admin can see this component
        <>
          <TabPanel value="products">
            <WarehouseProductContainer />
          </TabPanel>
          <TabPanel value="stock-mutations">
            <StockMutationContainer />
          </TabPanel>
        </>
      )}
    </TabContext>
  );
}

export default Container;

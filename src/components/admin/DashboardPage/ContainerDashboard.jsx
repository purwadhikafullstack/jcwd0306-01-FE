import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TotalSalesCard,
  TotalOrderCard,
  TotalProductCard,
  TotalUserCard,
} from './Cards/Cards';
import { MonthlyBar } from './Charts/MonthlyBar';
import { OrderStatusChart } from './Charts/OrderStatusPieChart';
import { setAlertActionCreator } from '../../../states/alert/action';
import api from '../../../constants/api';

function ContainerDashboard() {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);
  const isWarehouseAdmin = authUser?.WarehouseUser?.warehouseId;
  const [totalUser, setTotalUser] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalProductWarehouse, setTotalProductWarehouse] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalOrderWarehouse, setTotalOrderWarehouse] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalSalesWarehouse, setTotalSalesWarehouse] = useState(0);

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/user/getAll');
      setTotalUser(data?.info?.totalUsers);
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await api.get('/products/total');
      const totalStockSum = data.data.reduce(
        (sum, item) => sum + item.stock,
        0
      );
      setTotalProduct(totalStockSum);
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
  };

  const fetchProductWarehouse = async () => {
    try {
      const { data } = await api.get(
        `/products/total?warehouseId=${isWarehouseAdmin}`
      );
      const totalStockSum = data.data.rows.reduce(
        (sum, item) => sum + item.stock,
        0
      );
      setTotalProductWarehouse(totalStockSum);
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
  };

  const fetchOrder = async () => {
    try {
      const { data } = await api.get('/order');
      setTotalOrder(data?.count);
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
  };

  const fetchOrderByWarehouse = async () => {
    try {
      const { data } = await api.get(
        `/sales-reports/${isWarehouseAdmin}/order`
      );
      setTotalOrderWarehouse(data?.data?.count);
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
  };

  const fetchSales = async () => {
    try {
      const { data } = await api.get('sales-reports/revenue');
      setTotalSales(data?.data?.reduce((sum, order) => sum + order.total, 0));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
  };

  const fetchSalesByWarehouse = async () => {
    try {
      const { data } = await api.get(
        `sales-reports/${isWarehouseAdmin}/revenue`
      );
      setTotalSalesWarehouse(
        data?.data?.reduce((sum, order) => sum + order.total, 0)
      );
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
  };

  useEffect(() => {
    if (isWarehouseAdmin) {
      fetchOrderByWarehouse();
      fetchSalesByWarehouse();
      fetchProductWarehouse();
    }
    if (authUser.isAdmin) {
      fetchUser();
      fetchProduct();
      fetchOrder();
      fetchSales();
    }
  }, []);

  return (
    <Stack
      direction="column"
      spacing={3}
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
      }}
    >
      {/* Top Cards */}
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <TotalSalesCard
          totalSales={totalSales}
          totalSalesWarehouse={totalSalesWarehouse}
        />
        <TotalOrderCard
          totalOrder={totalOrder}
          totalOrderWarehouse={totalOrderWarehouse}
        />
        <TotalProductCard
          totalProduct={totalProduct}
          totalProductWarehouse={totalProductWarehouse}
        />
        <TotalUserCard totalUser={totalUser} />
      </Stack>

      {/* Mid Card */}
      <Stack
        spacing={{ xs: 3, md: 10 }}
        mt={10}
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <div style={{ width: { xs: '100%', md: '50%' } }}>
          <OrderStatusChart />
        </div>
        <div style={{ width: '100%' }}>
          <MonthlyBar />
        </div>
      </Stack>
    </Stack>
  );
}

export default ContainerDashboard;

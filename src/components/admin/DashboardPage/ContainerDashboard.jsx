import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const [totalUser, setTotalUser] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/user/getAll');
      setTotalUser(data?.data?.length);
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await api.get('/products');
      setTotalProduct(data?.data?.length);
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

  const fetchSales = async () => {
    try {
      const { data } = await api.get('sales-reports/revenue');
      setTotalSales(data?.data?.reduce((sum, order) => sum + order.total, 0));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProduct();
    fetchOrder();
    fetchSales();
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
        <TotalSalesCard totalSales={totalSales} />
        <TotalOrderCard totalOrder={totalOrder} />
        <TotalProductCard totalProduct={totalProduct} />
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

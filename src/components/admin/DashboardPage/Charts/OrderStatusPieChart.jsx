import { Pie } from 'react-chartjs-2';
import { useContext, useEffect, useState } from 'react';
import api from '../../../../constants/api';
import ModeContext from '../../../../contexts/ModeContext';

export function OrderStatusChart() {
  const [orderStatusData, setOrderStatusData] = useState({
    unpaid: 0,
    verifying: 0,
    processed: 0,
    shipped: 0,
    received: 0,
    cancelled: 0,
    rejected: 0,
  });
  const { mode } = useContext(ModeContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/sales-reports/order-statuses');

        const initialData = {
          unpaid: 0,
          verifying: 0,
          processed: 0,
          shipped: 0,
          received: 0,
          cancelled: 0,
          rejected: 0,
        };

        const updatedData = data.data.reduce(
          (acc, val) => {
            acc[val.status] += 1;
            return acc;
          },
          { ...initialData }
        );

        setOrderStatusData(updatedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: [
      'unpaid',
      'verifying',
      'processed',
      'shipped',
      'received',
      'cancelled',
      'rejected',
    ],
    datasets: [
      {
        data: [
          orderStatusData.unpaid,
          orderStatusData.verifying,
          orderStatusData.processed,
          orderStatusData.shipped,
          orderStatusData.received,
          orderStatusData.cancelled,
          orderStatusData.rejected,
        ],
        backgroundColor: [
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#FF6384', // Pink
          '#4BC0C0', // Teal
          '#9966CC', // Lavender
          '#FF8C00', // Orange
          '#EF4444', // Red
        ],
        hoverBackgroundColor: [
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#4BC0C0',
          '#9966CC',
          '#FF8C00',
          '#EF4444',
        ],
      },
    ],
  };

  return (
    <Pie
      data={data}
      options={{
        plugins: {
          legend: {
            labels: {
              color: mode === 'dark' ? 'white' : 'black',
            },
          },
          title: {
            display: true,
            text: 'Order Status',
            color: mode === 'dark' ? 'white' : 'black',
          },
        },
      }}
    />
  );
}

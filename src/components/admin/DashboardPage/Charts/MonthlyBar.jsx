import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import api from '../../../../constants/api';

Chart.register(CategoryScale);

export function MonthlyBar() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Product sold',
        data: [],
        backgroundColor: [
          '#007BFF',
          '#FFC107',
          '#28A745',
          '#DC3545',
          '#6610F2',
          '#FD7E14',
          '#6F42C1',
          '#17A2B8',
          '#E83E8C',
          '#FFD700',
          '#20C997',
          '#FF6347',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  const transformData = (backendData) => {
    const transformedData = backendData.reduce((acc, item) => {
      // Extract month from updatedAt (assuming updatedAt is a valid date string)
      const month = new Date(item.updatedAt).getMonth() + 1;

      // Initialize or update the productSold for the corresponding month
      acc[month] = (acc[month] || 0) + item.quantity;

      return acc;
    }, {});

    const labels = Array.from({ length: 12 }, (_, index) => index + 1);
    const data = labels.map((month) => transformedData[month] || 0);

    return { labels, data };
  };

  const fetchData = async () => {
    try {
      const { data } = await api.get('/sales-reports/product-sold');

      // Transform backend data and update chartData
      const { labels, data: productSoldData } = transformData(data?.data);
      setChartData((prevChartData) => ({
        ...prevChartData,
        labels,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: productSoldData,
          },
        ],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Bar
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: 'Products Sold between January-December',
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}

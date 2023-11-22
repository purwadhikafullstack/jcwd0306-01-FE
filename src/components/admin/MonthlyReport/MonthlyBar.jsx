import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Data } from './data';

export function MonthlyBar() {
  const [chartData, setChartData] = useState({
    labels: Data.map((val) => {
      let name = '';
      if (val.month === 1) name = 'January';
      else if (val.month === 2) name = 'February';
      else if (val.month === 3) name = 'March';
      else if (val.month === 4) name = 'April';
      else if (val.month === 5) name = 'May';
      else if (val.month === 6) name = 'June';
      else if (val.month === 7) name = 'July';
      return name;
    }),
    datasets: [
      {
        label: 'Product sold ',
        data: Data.map((val) => val.userGain),
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

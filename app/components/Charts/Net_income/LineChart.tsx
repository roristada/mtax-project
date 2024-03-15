import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // Import Line instead of Bar
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';

// Register the required components for a line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ apiData }: any) => {
    const [chartData, setChartData] = useState({
      labels: [],
      datasets: [
        {
          label: 'Net Income',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjusted for a line chart
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 2,
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(75, 192, 192)'
        },
      ],
    });

    useEffect(() => {
      if (apiData) {
        const validData = apiData.filter((item: { month: null; }) => item.month !== null);
    
        validData.sort((a: any, b: any) => {
          return parseInt(a.month) - parseInt(b.month);
        });
    
        const months = validData.map((item: { month: moment.MomentInput; }) => moment(item.month, 'M').format('MMMM'));
        const totalNetIncome = validData.map((item: { total_net_income: string; }) => parseFloat(item.total_net_income));
    
        setChartData({
          labels: months,
          datasets: [
            {
              ...chartData.datasets[0],
              data: totalNetIncome,
            },
          ],
        });
      }
    }, [apiData]);

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return (
      <div>
        <Line data={chartData} options={options} />
      </div>
    );
};

export default LineChart;

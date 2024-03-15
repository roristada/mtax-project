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
          const months = apiData.map((item: { month: moment.MomentInput; }) => moment(item.month, 'M').format('MMMM'));
          const datasets = [
            {
              label: 'Income 1',
              data: apiData.map((item: { sum_income_1: any; }) => item.sum_income_1),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2, // Make sure to include this
              pointBackgroundColor: 'rgb(255, 99, 132)', // And this
              pointBorderColor: '#fff', // And this
              pointHoverBackgroundColor: '#fff', // And this
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)', // And this
            },
            {
              label: 'Income 2',
              data: apiData.map((item: { sum_income_2: any; }) => item.sum_income_2),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2, // Make sure to include this
              pointBackgroundColor: 'rgb(255, 99, 132)', // And this
              pointBorderColor: '#fff', // And this
              pointHoverBackgroundColor: '#fff', // And this
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)', // And this
            },
            {
              label: 'Income 3',
              data: apiData.map((item: { sum_income_3: any; }) => item.sum_income_3),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2, // Make sure to include this
              pointBackgroundColor: 'rgb(255, 99, 132)', // And this
              pointBorderColor: '#fff', // And this
              pointHoverBackgroundColor: '#fff', // And this
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)', // And this
            },
            {
              label: 'Income 4',
              data: apiData.map((item: { sum_income_4: any; }) => item.sum_income_4),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2, // Make sure to include this
              pointBackgroundColor: 'rgb(255, 99, 132)', // And this
              pointBorderColor: '#fff', // And this
              pointHoverBackgroundColor: '#fff', // And this
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)', // And this
            },
            {
              label: 'Income 5',
              data: apiData.map((item: { sum_income_5: any; }) => item.sum_income_5),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2, // Make sure to include this
              pointBackgroundColor: 'rgb(255, 99, 132)', // And this
              pointBorderColor: '#fff', // And this
              pointHoverBackgroundColor: '#fff', // And this
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)', // And this
            },
            {
              label: 'Income 6',
              data: apiData.map((item: { sum_income_6: any; }) => item.sum_income_6),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2, // Make sure to include this
              pointBackgroundColor: 'rgb(255, 99, 132)', // And this
              pointBorderColor: '#fff', // And this
              pointHoverBackgroundColor: '#fff', // And this
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)', // And this
            },
            {
              label: 'Income 7',
              data: apiData.map((item: { sum_income_7: any; }) => item.sum_income_7),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2, // Make sure to include this
              pointBackgroundColor: 'rgb(255, 99, 132)', // And this
              pointBorderColor: '#fff', // And this
              pointHoverBackgroundColor: '#fff', // And this
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)', // And this
            },
            {
              label: 'Income 8',
              data: apiData.map((item: { sum_income_8: any; }) => item.sum_income_8),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2, // Make sure to include this
              pointBackgroundColor: 'rgb(255, 99, 132)', // And this
              pointBorderColor: '#fff', // And this
              pointHoverBackgroundColor: '#fff', // And this
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)', // And this
            },
            {
              label: 'Income 9',
              data: apiData.map((item: { sum_income_9: any; }) => item.sum_income_9),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2, // Make sure to include this
              pointBackgroundColor: 'rgb(255, 99, 132)', // And this
              pointBorderColor: '#fff', // And this
              pointHoverBackgroundColor: '#fff', // And this
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)', // And this
            },
            // Assuming you want to include datasets for income_2 through income_9 as well
            // Repeat the structure for each income type
            {
              label: 'Income 10',
              data: apiData.map((item: { sum_income_10: any; }) => item.sum_income_10),
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'rgb(54, 162, 235)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
            },
          ];
      
          setChartData({
            labels: months,
            datasets,
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

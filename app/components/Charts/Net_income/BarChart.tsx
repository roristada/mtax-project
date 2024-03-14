import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ apiData }:any) => {

    const [chartData, setChartData] = useState({
      labels: [],
      datasets: [
        {
          label: 'Net Income',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1,
        },
      ],
    });

    useEffect(() => {
      if (apiData) {
        // Filter out entries with null or invalid months
        const validData = apiData.filter((item: { month: null; }) => item.month !== null);
        
    
        // Sort the data by month
        validData.sort((a:any, b:any) => {
          return parseInt(a.month) - parseInt(b.month);
        });
    
        const months = validData.map((item: { month: moment.MomentInput; }) => moment(item.month, 'M').format('MMMM'));
        const totalNetIncome = validData.map((item: { total_net_income: string; }) => parseFloat(item.total_net_income));
        const maxNetIncome = Math.max(...totalNetIncome);
        
    
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

    const options = ({
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    });

    return (
      <div>
        <Bar data={chartData} options={options} />
      </div>
    );
};

export default BarChart;

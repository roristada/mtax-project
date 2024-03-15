import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ IncomeForYear }:any) => {
  console.log(IncomeForYear)
  
  // Assuming IncomeForYear is an object like { sum_income_1: "10000", sum_income_2: "15000", ... }
  const incomeValues = Object.keys(IncomeForYear).map((key) => parseFloat(IncomeForYear[key]));
  const incomeLabels = Object.keys(IncomeForYear).map((key) => 
  key.replace('sum_', '').replace('_', ' ').replace('income','รายได้').toUpperCase()
);

  const data = {
    labels: incomeLabels,
    datasets: [
      {
        data: incomeValues,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#E7E9ED',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#E7E9ED',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as any,
      },
      title: {
        display: true,
        text: 'Income Distribution'
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;

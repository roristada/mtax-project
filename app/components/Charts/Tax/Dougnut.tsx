import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface LabelMap {
    [key: string]: string;
  }

  const labelmap: LabelMap = {
    "employee_tax" : "ภาษีพนักงานจ่าย",
    "company_tax" : "ภาษีบริษัทจ่าย",
    "employee_social_security" : "ประกันสังคมพนักงานจ่าย",
    "company_social_security":"ประกันสังคมบริษัทจ่าย",
    "provident_fund" : "กองทุนสำรองเลี้ยงชีพ",
   
    
};
const DoughnutChart = ({Taxforyear}:any) => {

    
  
  // Assuming IncomeForYear is an object like { sum_income_1: "10000", sum_income_2: "15000", ... }
  const ExpensesValues = Object.keys(Taxforyear).map((key) => parseFloat(Taxforyear[key]));
  const ExpensesLabels = Object.keys(Taxforyear).map((key) => labelmap[key] || key);



const data = {
    labels: ExpensesLabels,
    datasets: [
      {
        data: ExpensesValues,
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
        text: 'Expenses Distribution'
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;

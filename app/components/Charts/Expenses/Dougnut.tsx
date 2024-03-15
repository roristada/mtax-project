import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface LabelMap {
    [key: string]: string;
  }

  const labelmap: LabelMap = {
    "sum_deduction_leave" : "หักจากการลาหยุด",
    "sum_deduction_late" : "หักจากการมาสาย",
    "sum_deduction_absence" : "หักจากการขาดงาน",
    "sum_deduction_early_leave":"หักจากการกลับก่อนเวลา",
    "sum_deduction_1" : "การหักเงิน 1",
    "sum_deduction_2" : "การหักเงิน 2",
    "sum_deduction_3" : "การหักเงิน 3",
    "sum_deduction_4" : "การหักเงิน 4",
    "sum_deduction_5" : "การหักเงิน 5",
    "sum_deduction_6" : "การหักเงิน 6",
    "sum_deduction_7" : "การหักเงิน 7",
    "sum_deduction_8" : "การหักเงิน 8",
    "sum_deduction_9" : "การหักเงิน 9",
    "sum_deduction_10" : "การหักเงิน 10",
    
};
const DoughnutChart = ({ Expensesforyear }: { Expensesforyear: LabelMap }) => {

    
  
  // Assuming IncomeForYear is an object like { sum_income_1: "10000", sum_income_2: "15000", ... }
  const ExpensesValues = Object.keys(Expensesforyear).map((key) => parseFloat(Expensesforyear[key]));
  const ExpensesLabels = Object.keys(Expensesforyear).map((key) => labelmap[key] || key);



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

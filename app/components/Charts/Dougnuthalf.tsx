import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Decimation } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Decimation);

const SemiCircleGauge = ({
  data: { current, goal },
}: {
  data: { current: number; goal: number };
}) => {
  const percentage = (current / goal) * 100;
  const data = {
    labels: ["Current", "Remaining"],
    datasets: [
      {
        data: [current, goal - current], // Your data array [achieved value, remaining value]
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(211, 211, 211, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(211, 211, 211, 1)"],
      },
    ],
  };

  const options = {
    responsive: true,
    circumference: 180, // half the circle
    rotation: -90, // start from top
    cutout: '50%', // adjust doughnut thickness
    plugins: {
      legend: {
        display: false, // hide legend
      },
      tooltip: {
        enabled: true, // enable tooltips
      },
      title: {
        display: true,
        text: `Goal Progress - ${percentage.toFixed(2)}%`,
      },
    },
    elements: {
      arc: {
        borderWidth: 0, // no border
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default SemiCircleGauge;

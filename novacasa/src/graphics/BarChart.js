import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const BarChart = () => {
  const chartRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current;

    if (chartInstance.current) {
      // Destrua o gráfico existente antes de criar um novo
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Sample Bar Chart',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 205, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              beginAtZero: true,
            },
          },
          y: {
            ticks: {
              beginAtZero: true,
            },
          },
        },
      },
    });
  }, []);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

<<<<<<< HEAD
export default BarChart;
=======
export default BarChart;
>>>>>>> 2d9f897939802285be9abaa85b59ebbaf384a12a

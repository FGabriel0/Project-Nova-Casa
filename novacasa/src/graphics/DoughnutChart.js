import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

const DonutChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    Chart.register(...registerables);

    const ctx = chartRef.current;
    let chartInstance = null;

    if (ctx) {
      chartInstance = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
          // Configurações opcionais do gráfico
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

<<<<<<< HEAD
export default DonutChart;
=======
export default DonutChart;
>>>>>>> 2d9f897939802285be9abaa85b59ebbaf384a12a

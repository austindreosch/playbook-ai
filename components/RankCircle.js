import dynamic from 'next/dynamic';
import React from 'react';

const DynamicApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

function RankCircle({ production = 50, potential = 50 }) {

  const options = {
    colors: ["#1C64F2", "#16BDCA"],
    chart: {
      height: 100,
      width: "100%",
      type: "donut",
    },
    labels: ["Production", "Potential"],
    dataLabels: {
      enabled: false,  // Disable data labels (percentage text on circle bars)
    },
    plotOptions: {
      pie: {
        customScale: 1,
        donut: {
          labels: {
            show: false,
          },
          size: "60%",
        },
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <div>
      {typeof window !== 'undefined' && (
        <DynamicApexCharts options={options} series={[production, potential]} type="donut" />
      )}
    </div>
  );
}

export default RankCircle;
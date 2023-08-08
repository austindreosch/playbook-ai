import dynamic from 'next/dynamic';
import React from 'react';

const DynamicApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

function RankCircle({ production = 50, potential = 50, score }) {

  const options = {
    series: [production, potential],
    colors: ["#FFBA08", "#3C91E6"],
    chart: {
      height: 100,
      width: "100%",
      type: "donut",
    },
    labels: ["Production", "Potential"],
    dataLabels: {
      enabled: false ,  // Disable data labels (percentage text on circle bars)
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "22px",
              fontFamily: "Helvetica, Arial, sans-serif",
              offsetY: 20,
            },
            value: {
              show: true,
              fontSize: "16px",
              fontFamily: "Helvetica, Arial, sans-serif",
            },
            total: {
              show: false,
              showAlways: false,
              label: 'Score',
              fontSize: "22px",
              fontFamily: "Helvetica, Arial, sans-serif",
            }
          },
          size: "60%",
        },
        customScale: 1,
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      {typeof window !== 'undefined' && (
        <div>
          <DynamicApexCharts options={options} series={[production, potential]} type="donut" />
          <div className="absolute inset-0 flex items-center justify-center text-2xl text-[2rem] font-bold text-mybrightorange stroke-slate-800">
            {score}
          </div>
        </div>
      )}
    </div>
  );
}

export default RankCircle;
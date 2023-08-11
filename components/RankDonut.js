import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);


export function RankDonut({score}) {
  
  const data = {
    labels: ['Production', 'Potential',],
    datasets: [
      {
        // label: '# of Votes',
        data: [73, 27],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgb(255, 209, 102, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderColor: 'lightgray',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // This will make the chart use the full height of its container
    layout: {
      width: '100%',  // or desired width
      height: '100%', // or desired height
    }
  };
  
  return (
    // if no white box //////////////////////////
    // 
    // <div className='h-[95%] mt-2 w-full flex align-middle justify-center relative'> {/* Add 'relative' here */}
    //   <Doughnut data={data} options={options}/>
    //   <h1 
    //     className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-4xl font-bold text-mybrightorange stroke-slate-800'
    //   >
    //     {score}
    //   </h1>
    // </div>


    <div className='w-full h-full flex align-middle justify-center relative'> {/* Add 'relative' here */}
      <Doughnut data={data} options={options}/>
      <h1 
        className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-4xl font-bold text-mybrightorange stroke-slate-800'
      >
        {score}
      </h1>
    </div>


  )
}

export default RankDonut;
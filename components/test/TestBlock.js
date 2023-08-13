'use client'

import FantraxTest from 'components/test/FantraxTest';
import SportsFeedTest from 'components/test/SportsFeedTest';
import React from 'react';


const TestBlock = () => {



  return (
    <div className='grid grid-cols-2'>
      <div className="bg-gray-700 text-white m-2 p-2 shadow-md rounded-lg">
        <b className='flex justify-center'>Fantrax Data</b>
        <FantraxTest/>
      </div>
      <div className='bg-gray-700 m-2 p-2 shadow-md rounded-lg text-white'>
        <b className='flex justify-center'>SportsFeed Data</b>
          <SportsFeedTest />
      </div>
    </div>
  );
};

export default TestBlock;

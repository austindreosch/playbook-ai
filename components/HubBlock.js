import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function HubBlock (){

  return (
    <div className="col-span-2 text-myblue bg-gray-50 rounded-md font-bold shadow-sm overflow-hidden mt-2 mx-2 p-4 h-full">
      <span className='p-2 px-4 bg-myblue text-white rounded-md mx-1'>League Name</span>
      <span className='p-2 px-4 bg-myblue text-white rounded-md mx-1'>Trade Machine</span>
      <span className='p-2 px-4 bg-myblue text-white rounded-md mx-1'>Dashboard View</span>
      <span className='p-2 px-4 bg-myblue text-white rounded-md mx-1'>Standings</span>
      <span className='p-2 px-4 bg-myblue text-white rounded-md mx-1'>Settings</span>
    </div>
  )
}

export default HubBlock;

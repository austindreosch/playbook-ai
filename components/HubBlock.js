import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function HubBlock (){

  return (
    <div className="col-span-2 text-white bg-myblue rounded-md font-bold shadow-sm overflow-hidden mt-2 mx-2 p-4 h-full">
      <span className='px-2'>League Name</span>
      <span className='px-2'>Trade Machine</span>
      <span className='px-2'>Update Rosters</span>
      <span className='px-2'>Standings</span>
      <span className='px-2'>Settings</span>
    </div>
  )
}

export default HubBlock;

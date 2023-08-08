'use client'

import React, { useEffect, useState } from 'react';
import RosterViewer from '../components/RosterViewer';

const leagueId = '4fzl7g0gljax6594'; // will be replaced by db call

function DetailBlock () {


  // Render the component
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden m-2 mx-1 h-full ">
      <h1 className='m-4 flex justify-center font-bold'>Team Details</h1>
      <div>
        <div> <RosterViewer leagueId="4fzl7g0gljax6594" />  </div>
      </div>
    </div>
  );
}

export default DetailBlock;

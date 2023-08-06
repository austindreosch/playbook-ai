'use client'

import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import RadioTabs from '../components/RadioTabs';
import RadioThree from '../components/RadioThree';

function DetailBlock (){

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden m-2 mx-1 h-full ">
        <h1 className='m-4 flex justify-center font-bold'>Team Details</h1>
        <div className='p-2'>
          <h2>Direction</h2>
          <div className='max-w-full flex justify-center'>
            <RadioTabs tab1="Rebuilding" tab2="Balanced" tab3="Contending"/>
          </div>
        </div>
      </div>
    )

}

export default DetailBlock;

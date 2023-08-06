'use client'

import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import RadioTabs from '../components/RadioTabs';
import RadioThree from '../components/RadioThree';

function DetailBlock (){

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden m-2 h-full">
        <h1 className='m-4'>Highlighted Player</h1>
        <h2></h2>
        {/* <RadioTabs tab1="Rebuilding" tab2="Balanced" tab3="Contending"/> */}
        <RadioThree tab1="Rebuilding" tab2="Balanced" tab3="Contending"/>
      </div>
    )

}

export default DetailBlock;

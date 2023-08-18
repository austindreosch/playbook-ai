'use client'

import React, { createRef, useRef, useState } from 'react';
import RosterBlockPlayerRow from './RosterBlockPlayerRow';










function RosterBlock({ players, roster }) {


    return (
        <div className="bg-white rounded-md shadow-md overflow-y-scroll hide-scrollbar p-4 my-2 mx-1 h-full">
            {/* Component Header */}
            <div className='flex'> 
                <h2 className="text-2xl leading-9 font-bold text-gray-900 mb-4">{roster}</h2>
                <h4 className='inline-block ml-3  mt-3 text-sm'>Franchise Mode • NBA • Dynasty • 20 Team</h4>
            </div>

            {/* Table Head */}
            <div className="bg-black text-white text-xs py-[3px] rounded-sm grid grid-cols-[3fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] mb-1 pr-1">

              <div className="col-span-3 flex items-center font-bold">
                  <span className="flex-1 text-center pl-1">RANK</span>
                  <span className="flex-1 text-center"></span>
                  <span className="flex-1 text-center"></span>
                  <span className="flex-1 text-center"></span>
              </div>
              <div className="col-span-7 flex items-center font-bold ">
                  <span className="flex-1 text-center p-[5px">FG%</span>
                  <span className="flex-1 text-center">3PM</span>
                  <span className="flex-1 text-center">FT%</span>
                  <span className="flex-1 text-center">PTS</span>
                  <span className="flex-1 text-center">REB</span>
                  <span className="flex-1 text-center">AST</span>
                  <span className="flex-1 text-center">ST</span>
                  <span className="flex-1 text-center">BLK</span>
                  <span className="flex-1 text-center">TO</span>
                  {/* <span className="flex text-center"></span> */}
              </div>
            </div>


            
            {players.map((player, index) => (
                <RosterBlockPlayerRow  player={player} index={index}/>
            ))}
        </div>
    );
}

export default RosterBlock;

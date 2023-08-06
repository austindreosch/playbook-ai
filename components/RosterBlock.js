'use client'

import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

function RosterBlock({ players }) {

    const [collapsed, setCollapsed] = useState(players.map(() => true));  // Each player starts as collapsed

    const toggleCollapse = (index) => {
        const newCollapsed = [...collapsed];
        newCollapsed[index] = !newCollapsed[index];
        setCollapsed(newCollapsed);
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-y-scroll hide-scrollbar p-4 my-2 mx-1 h-full">
            <h2 className="text-2xl leading-9 font-bold text-gray-900 mb-4">Your Roster</h2>

            <div className=" bg-myblue text-white text-xs py-[3px] px-1 rounded-sm grid grid-cols-7 mb-1">
              <div className="col-span-1 flex items-center ml-1 font-bold">
                  <span className="flex-1 text-center"></span>
                  <span className="flex-1 text-center">RANK</span>
                  <span className="flex-1 text-center"></span>
              </div>
              <div className="col-span-2 flex items-center font-bold">
                  <span className="flex-1 text-center"></span>
                  <span className="flex-1 text-center"></span>
              </div>
              <div className="col-span-4 flex items-center pr-1 font-bold">
                  <span className="flex-1 text-center">AGE</span>
                  <span className="flex-1 text-center">FG%</span>
                  <span className="flex-1 text-center">3PM</span>
                  <span className="flex-1 text-center">FT%</span>
                  <span className="flex-1 text-center">PTS</span>
                  <span className="flex-1 text-center">REB</span>
                  <span className="flex-1 text-center">AST</span>
                  <span className="flex-1 text-center">ST</span>
                  <span className="flex-1 text-center">BLK</span>
                  <span className="flex-1 text-center">TO</span>
                  {/* <span className="flex-1 text-center"></span> */}
              </div>
            </div>


            
            {players.map((player, index) => (
                <div key={index} className="border border-gray-200 mb-1 bg-base-200">
                    {/* Collapsible Title */}
                    <div 
                        className="text-lg font-medium flex px-2 cursor-pointer grid grid-cols-7" 
                        onClick={() => toggleCollapse(index)}
                    >
                          <div className="col-span-1 flex items-center text-sm mr-2">
                            <span className="flex-1 text-center"><span className='text-gray-600 text-xs mx-[1px]'>#</span>{player.dynastyRank}</span>
                            <span className="flex-1 text-center font-bold text-mybrightorange">{player.playerscore}</span>
                            <span className="flex-1 text-center">{player.standardscore}</span>
                          </div>

                        <div className="col-span-2 flex items-center">
                            <div className="h-8 w-8 inline-flex items-center justify-center mr-2 my-[2px]">
                                <img className='bg-gray-200 rounded-lg' src={player.image} alt="" />
                            </div>
                            <div className=''>
                                <div className='text-sm leading-tight'>{player.name}</div>
                                <div className='text-2xs text-gray-400 leading-tight'>
                                  {player.position}  ·  {player.team}
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-span-4 flex items-center text-sm ">
                          <span className="flex-1 text-center">{player.age}</span>
                          <span className="flex-1 text-center">{player.fgPercent}</span>
                          <span className="flex-1 text-center">{player.threePM}</span>
                          <span className="flex-1 text-center">{player.ftPercent}</span>
                          <span className="flex-1 text-center">{player.pts}</span>
                          <span className="flex-1 text-center">{player.reb}</span>
                          <span className="flex-1 text-center">{player.ast}</span>
                          <span className="flex-1 text-center">{player.st}</span>
                          <span className="flex-1 text-center">{player.blk}</span>
                          <span className="flex-1 text-center">{player.to}</span>
                          {/* <FontAwesomeIcon icon={faSliders} className="text-myblue text-sm " /> */}
                      </div>
                    </div>

                    {/* Collapsible Content */}
                    {!collapsed[index] && (
                        <div className="p-2">
                            {/* Add additional player details here */}
                            <div className="h-6 w-6 inline-flex items-center justify-center p-4">
                                <FontAwesomeIcon icon={faSliders} className="text-myblue text-sm " />
                            </div>
                            <span> Extra details go here...</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default RosterBlock;

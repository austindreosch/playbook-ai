'use client'

import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import RankCircle from "../components/RankCircle";

function getColorForStat(value, average) {
    // Define weights (ranges) inside the function
    const eliteRange = average * 1.2; // 20% better than average
    const goodRange = average * 1.1; // 10% better than average
    const poorRange = average * 0.9; // 10% worse than average
    const badRange = average * 0.8; // 20% worse than average

    if (value >= eliteRange) return 'bg-green-300';
    if (value >= goodRange) return 'bg-green-200';
    if (value >= average) return 'bg-green-100';
    if (value >= poorRange) return 'bg-red-100';
    return 'bg-red-300';
}

function getColorForTO(value, average) {
    const eliteRange = average * 0.8;
    const goodRange = average * 0.9;
    const badRange = average * 1.1;

    if (value <= eliteRange) return 'bg-green-300';
    if (value <= goodRange) return 'bg-green-200';
    if (value <= average) return 'bg-green-100';
    if (value <= badRange) return 'bg-red-100';
    return 'bg-red-300';
}





function RosterBlock({ players, roster }) {

    const [collapsed, setCollapsed] = useState(players.map(() => true));  // Each player starts as collapsed

    const toggleCollapse = (index) => {
        const newCollapsed = [...collapsed];
        newCollapsed[index] = !newCollapsed[index];
        setCollapsed(newCollapsed);
    };

    return (
        <div className="bg-white rounded-md shadow-md overflow-y-scroll hide-scrollbar p-4 my-2 mx-1 h-full">
            <h2 className="text-2xl leading-9 font-bold text-gray-900 mb-4">{roster}</h2>

            {/* Collapsible Header */}
            <div className=" bg-myblue text-white text-xs py-[3px] px-1 rounded-sm grid grid-cols-7 mb-1">
              <div className="col-span-1 flex items-center ml-1 font-bold">
                  <span className="flex-1 text-center"></span>
                  <span className="flex-1 text-center">RANK</span>
                  <span className="flex-1 text-center"></span>
                  <span className="flex-1 text-center">AGE </span>
              </div>
              <div className="col-span-2 flex items-center font-bold">
                  <span className="flex-1 text-center"></span>
                  <span className="flex-1 text-center"></span>
              </div>
              <div className="col-span-4 flex items-center pr-1 font-bold">
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
                    
                    {/* Collapsible Front */}
                    <div 
                        className="text-lg font-medium px-2 cursor-pointer grid grid-cols-7" 
                        onClick={() => toggleCollapse(index)}
                    >
                          <div className="col-span-1 flex items-center text-sm mr-2">
                            <span className="flex-1 text-center"><span className='text-gray-600 text-xs mx-[1px]'>#</span>{player.dynastyRank}</span>
                            <span className="flex-1 text-center font-bold text-mybrightorange">{player.playerscore}</span>
                            {/* <span className="flex-1 text-center">{player.standardscore}</span> */}
                            <span className="flex-1 text-center">{player.age}</span>
                          </div>

                        <div className="col-span-2 flex items-center">
                            <div className="h-8 w-8 inline-flex items-center justify-center mr-2 my-[3px]">
                                <img className='bg-gray-200 rounded-md' src={player.image} alt="" />
                            </div>
                            <div className=''>
                                <div className='text-sm leading-tight'>{player.name}</div>
                                <div className='text-2xs text-gray-400 leading-tight'>
                                  {player.position}  ·  {player.team}
                                </div>
                            </div>
                        </div>
                        

                        <div className="col-span-4 flex items-center text-xs gap-[2px]">
                            <span className={`rounded-sm flex-1 text-2xs p-[5px] text-center ${getColorForStat(parseFloat(player.fgPercent), 49.1)}`}>{player.fgPercent}</span>
                            <span className={`rounded-sm flex-1 p-[5px] text-center ${getColorForStat(player.threePM, 1.63)}`}>{player.threePM}</span>
                            <span className={`rounded-sm flex-1 text-2xs p-[5px] text-center ${getColorForStat(parseFloat(player.ftPercent), 80.0)}`}>{player.ftPercent}</span>
                            <span className={`rounded-sm flex-1 p-[5px] text-center ${getColorForStat(player.pts, 17.11)}`}>{player.pts}</span>
                            <span className={`rounded-sm flex-1 p-[5px] text-center ${getColorForStat(player.reb, 5.83)}`}>{player.reb}</span>
                            <span className={`rounded-sm flex-1 p-[5px] text-center ${getColorForStat(player.ast, 3.97)}`}>{player.ast}</span>
                            <span className={`rounded-sm flex-1 p-[5px] text-center ${getColorForStat(player.st, 0.96)}`}>{player.st}</span>
                            <span className={`rounded-sm flex-1 p-[5px] text-center ${getColorForStat(player.blk, 0.64)}`}>{player.blk}</span>
                            <span className={`rounded-sm flex-1 p-[5px] text-center ${getColorForTO(player.to, 1.96)}`}>{player.to}</span>
                        </div>

                    </div>

                    {/* Collapsible Content */}
                    {!collapsed[index] && (
                        <div className="p-2  max-h-40">
                            {/* Add additional player details here */}
                            <div className='mr-100 flex'>
                                <RankCircle production={73} potential={27}/>   
                            </div>


                            {/* <div className="h-6 w-6 inline-flex items-center justify-center p-4">
                                <FontAwesomeIcon icon={faSliders} className="text-myblue text-sm " />
                            </div>
                            <span> Extra details go here...</span> */}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default RosterBlock;

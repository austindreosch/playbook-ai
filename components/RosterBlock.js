'use client'

import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import RankCircle from "../components/RankCircle";

function getColorForStat(value, average) {
    // Define weights (ranges) inside the function
    const eliteRange = average * 1.10; // 20% better than average
    const goodRange = average * 1.02; // 10% better than average
    const poorRange = average * 0.85; // 10% worse than average
    const badRange = average * 0.7; // 20% worse than average

    if (value >= eliteRange) return 'bg-green-300';
    if (value >= goodRange) return 'bg-green-100';
    if (value >= average) return 'bg-green-50';
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
            {/* Component Header */}
            <div className='flex'> 
                <h2 className="text-2xl leading-9 font-bold text-gray-900 mb-4">{roster}</h2>
                <h4 className='inline-block ml-3  mt-3 text-sm'>Franchise Mode • NBA • Dynasty • 20 Team</h4>
            </div>

            {/* Table Head */}
            <div className=" bg-myorange text-white text-xs py-[3px] rounded-sm grid grid-cols-7 mb-1">

              <div className="col-span-3 flex items-center font-bold">
                  <span className="flex-1 text-center ml-1">RANK</span>
                  <span className="flex-1 text-center"></span>
                  <span className="flex-1 text-center"></span>
                  <span className="flex-1 text-center"></span>
              </div>
              <div className="col-span-4 flex items-center font-bold">
                  <span className="flex text-center">FG%</span>
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
                <div key={index} className="border border-gray-100 my-[.2rem] shadow-sm">
                    
                    {/* Collapsible Front */}
                    <div 
                        className="text-lg font-medium px-1 cursor-pointer grid grid-cols-7" 
                        onClick={() => toggleCollapse(index)}>

                        <div className="col-span-3 grid grid-cols-8">
                            <span className="col-span-1 flex-1 text-center mt-[.3rem]"><span className='text-gray-400 text-sm mx-[1px]'>#</span>{player.dynastyRank}</span>
                            <span className="col-span-1 flex-1 text-center mt-[.3rem] font-bold text-mybrightorange">{player.playerscore}</span>
                            <div className="col-span-1 h-8 w-8 inline-flex items-center justify-center mr-2 my-[3px] mx-1">
                                <img className='bg-gray-200 rounded-md' src={player.image} alt="" />
                            </div>
                            <div className='col-span-5 ml-1 mt-1'>
                                <div className='text-sm leading-tight'>{player.name}</div>
                                <div className='text-2xs text-gray-400 leading-tight'>
                                  {player.position}  ·  {player.team}
                                </div>
                            </div>
                        </div>
                        

                        <div className="col-span-4 flex items-center text-xs gap-[2px]">
                            <span className={`border border-gray-100 rounded-sm flex-1 text-2xs p-[5px] text-center ${getColorForStat(parseFloat(player.fgPercent), 49.1)}`}>{player.fgPercent}</span>
                            <span className={`border border-gray-100 rounded-sm flex-1 p-[5px] text-center ${getColorForStat(player.threePM, 1.63)}`}>{player.threePM}</span>
                            <span className={`border border-gray-100 rounded-sm flex-1 text-2xs p-[5px] text-center ${getColorForStat(parseFloat(player.ftPercent), 80.0)}`}>{player.ftPercent}</span>
                            <span className={`border border-gray-100 rounded-sm flex-1 p-[5px] text-center ${getColorForStat(player.pts, 17.11)}`}>{player.pts}</span>
                            <span className={`border border-gray-100 rounded-sm flex-1 p-[5px] text-center ${getColorForStat(player.ast, 3.97)}`}>{player.ast}</span>
                            <span className={`border border-gray-100 rounded-sm flex-1 p-[5px] text-center ${getColorForStat(player.st, 0.96)}`}>{player.st}</span>
                            <span className={`border border-gray-100 rounded-sm flex-1 p-[5px] text-center ${getColorForStat(player.blk, 0.64)}`}>{player.blk}</span>
                            <span className={`border border-gray-100 rounded-sm flex-1 p-[5px] text-center ${getColorForTO(player.to, 1.96)}`}>{player.to}</span>
                        </div> 
                    </div>

                    {/* Collapsible Content */}
                    {!collapsed[index] && (
                        <div className="p-2  max-h-36 grid grid-cols-11">
                            <div className='col-span-1 text-sm text-center grid grid-flow-row ml-4'>
                                <div>
                                    <p>rank</p>
                                    <p className='text-md text-gray-400 mr-1'>#<b className='text-xl text-black'>{player.dynastyRank}</b></p>
                                </div>
                                <div>
                                    <p>standard</p>
                                    <b className='text-xl'>{player.standardscore}</b>
                                </div>
                            </div>
                            <div className='col-span-3 mt-[-8px]'>
                                <RankCircle production={73} potential={27} score={player.playerscore}/>   
                                
                            </div>
                            <div className='col-span-7 grid grid-cols-3'>

                                <div className='col-span-1'>
                                    <b>Intuition</b>
                                    <p>Like</p>
                                    <b>Future</b>
                                    <p>Neutral</p>
                                </div>
                                <div className='col-span-1 border border-gray-300  bg-gray-50 ml-1 mb-2 p-1 rounded-sm'>
                                    <p>age: {player.age}</p>
                                    <p>mpg: 32.1</p>
                                    <p>last 60: #47</p>
                                    <p>last 2YR: #63</p>
                                    <p>contract: 3 years</p>
                                </div>
                                <p className='border border-gray-300 bg-gray-50 ml-1 mb-2 p-1 rounded-sm'>other stuff here</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default RosterBlock;

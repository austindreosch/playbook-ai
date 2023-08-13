'use client'

import { faCalendarDays, faClock, faSackDollar, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createRef, useRef, useState } from 'react';
import RankDonut from '../components/RankDonut';

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
    const [collapsed, setCollapsed] = useState(players.map(() => true)); // Each player starts as collapsed
    
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
            <div className=" bg-black text-white text-xs py-[3px] rounded-sm grid grid-cols-7 mb-1">

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
                <div key={index} className="border border-gray-100 my-[.25rem] shadow-sm">
                    
                    {/* Collapsible Front */}
                    <div 
                        className=" text-lg font-medium px-1 cursor-pointer grid grid-cols-7" 
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
                        // <div className={`grid grid-cols-16 shadow-top bg-gray-100 transition-max-height duration-500 ease-in-out overflow-y-hidden ${collapsed[index] ? 'max-h-0' : 'max-h-40'}`}>

                        <div className={`grid grid-cols-18 bg-gray-100 border border-gray-200 transition-max-height duration-500 ease-in-out overflow-y-hidden gradient-shadow ${collapsed[index] ? 'max-h-0' : 'max-h-[10.5rem]'}`}>
                            <div className='col-span-2 '>
                                <div className="mx-auto flex justify-center items-center h-full pt-[.1rem] mb-[.06rem]">
                                    <ul className="bg-white divide-y grid grid-rows-3 divide-gray-200 rounded-lg border border-gray-200 shadow-sm text-center text-3xs leading-tight mx-1 w-full ">
                                        <li className=" flex justify-center items-center p-1 leading-none">
                                            <div>
                                                <h4>rank</h4>
                                                <p className='text-lg' ><span className='text-gray-500 text-sm'>#</span>{player.dynastyRank}</p>
                                            </div>
                                        </li>
                                        <li className=" flex justify-center items-center p-1 leading-none">
                                            <div>
                                                <h4 >consensus</h4>
                                                <p className='text-lg'><span className='text-gray-500 text-sm'>#</span>{player.dynastyRank + Math.floor(Math.random() * 5 - 2)}</p>
                                            </div>
                                        </li>
                                        <li className=" flex justify-center items-center p-1 leading-none">
                                            <div>
                                            <h4 >standard</h4>
                                            <b className=' text-lg text-mybrightorange'>{player.standardscore}</b>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-span-4 h-[10rem] py-1 pt-3 pl-1'>
                                <RankDonut score={player.playerscore}/>

                                {/* <div className=' bg-white rounded-lg py-1 border border-gray-200 shadow-sm align-middle justify-center h-[97%] m-1 mt-[.3rem]'>
                                    <RankDonut score={player.playerscore}/>
                                </div> */}
                            </div>
                            <div className='col-span-12 grid grid-cols-8 pt-[0.25rem]'>
                                <div className='col-span-3 grid grid-flow-row align-center mt-4'>
                                    <div class="space-x-1 ml-1">
                                        <div class="bg-white rounded-lg border border-gray-200 py-0.5 shadow-sm w-full grid grid-cols-3">
                                            <button type="button" className="col-span-1 rounded-md bg-white px-1 py-1 text-center text-xs font-medium text-secondary-700 hover:bg-gray-100">
                                                <p>Favor</p>
                                            </button>
                                            <button type="button" className="col-span-1 rounded-md bg-gray-400 px-1 py-1 text-center text-xs font-medium text-white hover:bg-myotherblue">
                                                <p>Neutral</p>
                                            </button>
                                            <button type="button" className="col-span-1 rounded-md bg-white px-1 py-1 text-center text-xs font-medium text-secondary-700 hover:bg-gray-100">
                                                <p>Dislike</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="space-x-1 ml-1">
                                        <div class="bg-white rounded-lg border border-gray-200 py-0.5 shadow-sm w-full grid grid-cols-3 ">
                                            <button type="button" className="col-span-1 rounded-md bg-white px-1 py-1 text-center text-xs font-medium text-secondary-700 hover:bg-gray-100">
                                                <p>Faith</p>
                                            </button>
                                            <button type="button" className="col-span-1 rounded-md bg-gray-400 px-1 py-1 text-center text-xs font-medium text-white hover:bg-myotherblue">
                                                <p>Neutral</p>
                                            </button>
                                            <button type="button" className="col-span-1 rounded-md bg-white px-1 py-1 text-center text-xs font-medium text-secondary-700 hover:bg-gray-100">
                                                <p>Doubt</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="space-x-1 ml-1">
                                        <div class="bg-white rounded-lg border border-gray-200 py-0.5 shadow-sm w-full grid grid-cols-3">
                                            <button type="button" className="col-span-1 rounded-md bg-white px-1 py-1 text-center text-xs font-medium text-secondary-700 hover:bg-gray-100">
                                                <p>Smart</p>
                                            </button>
                                            <button type="button" className="col-span-1 rounded-md bg-gray-400 px-1 py-1 text-center text-xs font-medium text-white hover:bg-myotherblue">
                                                <p>Neutral</p>
                                            </button>
                                            <button type="button" className="col-span-1 rounded-md bg-white px-1 py-1 text-center text-xs font-medium text-secondary-700 hover:bg-gray-100">
                                                <p>Dumb</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-span-5  bg-white pt-[.4rem] px-2 ml-2 mr-1 rounded-lg  border border-gray-200 shadow-sm mb-1 '>
                                <div className='grid grid-cols-5 my-auto align-middle justify-center px-2'>
                                        <div className='col-span-2 grid grid-flow-cols'>
                                            <div> <FontAwesomeIcon icon={faCalendarDays} /> <b className='text-center ml-0.5'>AGE</b>  </div>
                                            <div> <FontAwesomeIcon icon={faClock} /> <b className='text-center'>MINS</b>  </div>
                                            <div> <FontAwesomeIcon icon={faSackDollar} /> <b className='text-center '>DEAL</b>  </div>
                                            <div> <FontAwesomeIcon icon={faSackDollar} /> <b className='text-center '>SAL</b>  </div>
                                        </div>
                                        <div className='col-span-3 ml-1'>
                                            <div> <span> {player.age}</span> </div>
                                            <div> <span> {player.age + 5}</span> </div>
                                            <div> <span> {Math.round(player.age / 10)}YR</span> </div>
                                            <div> <span> {player.age + 10}M</span> </div>
                                        </div>
                                    </div>
                                    <div className='my-auto align-middle justify-center flex px-2'><img  className="rounded-lg w-full max-h-full border border-gray-300 bg-gray-50"src={player.image} alt="" /></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default RosterBlock;

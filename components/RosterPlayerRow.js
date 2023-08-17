import React from "react";

export const RosterPlayerRow = ({ player, index }) => {
    <div key={index} className="border border-gray-100 my-[.25rem] shadow-sm">  
        {/* Collapsible Front */}
        <div 
            className="text-lg font-medium px-1 cursor-pointer grid grid-cols-[3fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr]" 
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
            

            <div className="col-span-7 flex items-center text-xs gap-[2px] overflow-hidden">
                <span className={`border border-gray-100 rounded-sm flex-1 text-2xs py-[5px] text-center ${getColorForStat(parseFloat(player.fgPercent), 49.1)}`}>{player.fgPercent}</span>
                <span className={`border border-gray-100 rounded-sm flex-1 py-[5px] text-center ${getColorForStat(player.threePM, 1.63)}`}>{player.threePM}</span>
                <span className={`border border-gray-100 rounded-sm flex-1 text-2xs py-[5px] text-center ${getColorForStat(parseFloat(player.ftPercent), 80.0)}`}>{player.ftPercent}</span>
                <span className={`border border-gray-100 rounded-sm flex-1 py-[5px] text-center ${getColorForStat(player.pts, 17.11)}`}>{player.pts}</span>
                <span className={`border border-gray-100 rounded-sm flex-1 py-[5px] text-center ${getColorForStat(player.pts, 17.11)}`}>{player.reb}</span>
                <span className={`border border-gray-100 rounded-sm flex-1 py-[5px] text-center ${getColorForStat(player.ast, 3.97)}`}>{player.ast}</span>
                <span className={`border border-gray-100 rounded-sm flex-1 py-[5px] text-center ${getColorForStat(player.st, 0.96)}`}>{player.st}</span>
                <span className={`border border-gray-100 rounded-sm flex-1 py-[5px] text-center ${getColorForStat(player.blk, 0.64)}`}>{player.blk}</span>
                <span className={`border border-gray-100 rounded-sm flex-1 py-[5px] text-center ${getColorForTO(player.to, 1.96)}`}>{player.to}</span>
            </div> 
        </div>

        {/* Collapsible Content */}
        {!collapsed[index] && (
            // <div className={`grid grid-cols-16 shadow-top bg-gray-100 transition-max-height duration-500 ease-in-out overflow-y-hidden ${collapsed[index] ? 'max-h-0' : 'max-h-40'}`}>

            <div className={`grid grid-cols-18 bg-gray-100 border border-gray-200 transition-max-height duration-500 ease-in-out overflow-y-hidden gradient-shadow ${collapsed[index] ? 'max-h-0' : 'max-h-[10.5rem]'}`}>
                <div className='col-span-2'>
                    <div className="m-auto flex justify-center items-center pt-[.1rem] mb-[.06rem] mt-[.7rem]">
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
                <div className='col-span-12  ml-1 m-1 max-h-[9.5rem] '>
                    <div className='col-span-12 grid grid-rows-8  bg-white  rounded-lg  border border-gray-200 shadow-md h-full'>
                        <div className='grid grid-cols-12 row-span-6 my-auto align-middle justify-center px-2 h-full'>
                            <div className='col-span-2 grid grid-flow-cols py-2'>
                                <div> <FontAwesomeIcon icon={faCalendarDays} /> <b className='text-center ml-0.5'>AGE</b>  </div>
                                <div> <FontAwesomeIcon icon={faClock} /> <b className='text-center'>MINS</b>  </div>
                                <div> <FontAwesomeIcon icon={faSackDollar} /> <b className='text-center '>DEAL</b>  </div>
                                <div> <FontAwesomeIcon icon={faSackDollar} /> <b className='text-center '>SAL</b>  </div>
                            </div>
                            <div className='col-span-1 ml-1 grid grid-flow-cols py-2'>
                                <div> <span> {player.age}</span> </div>
                                <div> <span> {player.age + 5}</span> </div>
                                <div> <span> {Math.round(player.age / 10)}YR</span> </div>
                                <div> <span> {player.age + 10}M</span> </div>
                            </div>
                            <div className='col-span-9 my-auto align-middle justify-center flex px-2'>
                                <img  className="rounded-lg border border-gray-300 bg-gray-50 h-20 w-20 my-auto max-h-full" src={player.image} alt="" />
                                
                                <div className=' grid grid-flow-row align-center mt-4 w-full'>
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
                            </div>
                        </div>
                        <div className='row-span-2  text-center rounded-md'>

                            <div className=' flex justify-center middle-align bg-gray-100 border border-gray-300 rounded-b-md'>
                                <div className="overflow-hidden rounded-md  ">
                                    <ul className="grid items-center gap-4 text-sm font-medium grid-flow-col  my-0.5">
                                    {['Current', 'Last 30', 'Last 60', 'Last Season', 'Last 2 Seasons'].map((tab, index) => (
                                        <li key={index}>
                                        <a
                                            onClick={() => setActiveTab(index)}
                                            className={`inline-flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 ${
                                            activeTab === index ? 'bg-myblue text-white shadow-md' : ''
                                            } hover:bg-mymidblue hover:text-white hover:shadow`}
                                        >
                                            {tab}
                                        </a>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                        

                    </div>
                </div>
            </div>
        )}
        </div>
}
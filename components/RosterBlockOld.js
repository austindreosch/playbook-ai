import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function RosterBlockOld ({players}){

    return (
        <div className="bg-white rounded-xl shadow-md overflow-y-scroll hide-scrollbar p-4 m-2  h-full">
          <h2 className="text-2xl leading-9 font-bold text-gray-900 mb-4">Your Roster</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-myblue text-white text-xs rounded-lg">
              <tr className="">
                <th className="w-1/16 py-3"></th>
                <th className="w-1/16 ">Score</th>
                <th className="w-1/16"></th>
                <th className="w-1/16"></th>
                <th className="w-1/12 text-left"></th>
                <th className="w-1/16 text-center">Age</th>
                <th className="w-1/16 text-center">FG%</th>
                <th className="w-1/16 text-center">3PM</th>
                <th className="w-1/16 text-center">FT%</th>
                <th className="w-1/16 text-center">PTS</th>
                <th className="w-1/16 text-center">REB</th>
                <th className="w-1/16 text-center">AST</th>
                <th className="w-1/16 text-center">ST</th>
                <th className="w-1/16 text-center">BLK</th>
                <th className="w-1/16 text-center">TO</th>
                <th className="w-1/16 "></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {players.map((player, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-1 px-1 text-center">#{player.dynastyRank}</td>
                  <td className="py-1 px-1 text-center font-bold text-mybrightorange"><strong>{player.playerscore}</strong></td>
                  <td className="py-1 px-1 text-center">{player.standardscore}</td>
                  
                  <td className="py-1 px-1 flex items-center justify-center">
                    <div className="h-8 w-8 inline-flex items-center justify-center">
                      <img className='bg-gray-200 rounded-lg' src={player.image} alt="" />
                    </div>
                  </td>

                  <td className="leading-tight text-left truncate">
                    <div>
                      <b>{player.name}</b>
                    </div>
                    <div className=' text-2xs'>
                      {player.position}  ·  {player.team}
                    </div>
                  </td>
                  <td className="py-1 px-1 text-center">{player.age}</td>
                  <td className="py-1 text-center">{player.fgPercent}</td>
                  <td className="py-1 px-1 text-center">{player.threePM}</td>
                  <td className="py-1 text-center">{player.ftPercent}</td>
                  <td className="py-1 px-1 text-center">{player.pts}</td>
                  <td className="py-1 px-1 text-center">{player.reb}</td>
                  <td className="py-1 px-1 text-center">{player.ast}</td>
                  <td className="py-1 px-1 text-center">{player.st}</td>
                  <td className="py-1 px-1 text-center">{player.blk}</td>
                  <td className="py-1 px-1 text-center">{player.to}</td>
                  <td className=" text-center">
                  <div className="h-6 w-6 inline-flex items-center justify-center">
                    <FontAwesomeIcon icon={faSliders} className="text-myblue text-sm mt-2 p-1" />
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )

}

export default RosterBlockOld;

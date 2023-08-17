'use client'

import { faCalendarDays, faClock, faSackDollar, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createRef, useRef, useState } from 'react';
import RankDonut from '../components/RankDonut';
import { RosterPlayerRow } from '../components/RosterPlayerRow';


// import players from '../data/players.json';

const players = [
    { playerscore: 98, standardscore: 95, image: 'https://fantraximg.com/si/headshots/NBA/hs0011e_96_6.png', dynastyRank: 86, name: 'LeBron James', position: 'SF', team: 'LAL', age: 36, fgPercent: '50.4%', threePM: 2.3, ftPercent: '69.8%', pts: 25, reb: 8.2, ast: 8.6, st: 1.3, blk: 1.1, to: 3.2 },
    { playerscore: 96, standardscore: 94, image: 'https://fantraximg.com/si/headshots/NBA/hs001aw_96_6.png', dynastyRank: 42, name: 'Kevin Durant', position: 'SF', team: 'BKN', age: 33, fgPercent: '52.8%', threePM: 2.5, ftPercent: '88.2%', pts: 27, reb: 7, ast: 5, st: 0.7, blk: 1.3, to: 3.1 },
    { playerscore: 94, standardscore: 92, image: 'https://fantraximg.com/si/headshots/NBA/hs01enh_96_6.png', dynastyRank: 46, name: 'Stephen Curry', position: 'PG', team: 'GSW', age: 33, fgPercent: '48.1%', threePM: 4.7, ftPercent: '91.6%', pts: 27, reb: 5, ast: 6, st: 1.2, blk: 0.3, to: 3.3 },
    { playerscore: 92, standardscore: 90, image: 'https://fantraximg.com/si/headshots/NBA/hs031m2_96_6.png', dynastyRank: 7, name: 'Giannis Antetokounmpo', position: 'PF', team: 'MIL', age: 26, fgPercent: '56.9%', threePM: 1.1, ftPercent: '68.5%', pts: 28, reb: 11, ast: 6, st: 1.2, blk: 1.3, to: 3.5 },
    { playerscore: 91, standardscore: 89, image: 'https://fantraximg.com/si/headshots/NBA/hs027oz_96_6.png', dynastyRank: 42, name: 'Kawhi Leonard', position: 'SF', team: 'LAC', age: 30, fgPercent: '51.2%', threePM: 2.0, ftPercent: '88.5%', pts: 25, reb: 6, ast: 5, st: 1.6, blk: 0.6, to: 2 },
    { playerscore: 89, standardscore: 87, image: 'https://fantraximg.com/si/headshots/NBA/hs04kj6_96_5.png', dynastyRank: 2, name: 'Luka Doncic', position: 'PG', team: 'DAL', age: 22, fgPercent: '47.9%', threePM: 2.9, ftPercent: '73.2%', pts: 28, reb: 8, ast: 8, st: 1, blk: 0.5, to: 4 },
    { playerscore: 88, standardscore: 86, image: 'https://fantraximg.com/si/headshots/NBA/hs01eo6_96_6.png', dynastyRank: 38, name: 'James Harden', position: 'SG', team: 'BKN', age: 31, fgPercent: '44.4%', threePM: 2.8, ftPercent: '86.3%', pts: 25, reb: 8, ast: 10, st: 1.3, blk: 0.8, to: 4 },
    { playerscore: 87, standardscore: 85, image: 'https://fantraximg.com/si/headshots/NBA/hs03al2_96_6.png', dynastyRank: 13, name: 'Joel Embiid', position: 'C', team: 'PHI', age: 27, fgPercent: '51.3%', threePM: 1.0, ftPercent: '85.9%', pts: 28, reb: 10, ast: 3, st: 0.9, blk: 1.4, to: 3 },
    { playerscore: 85, standardscore: 83, image: 'https://fantraximg.com/si/headshots/NBA/hs02nf1_96_6.png', dynastyRank: 25, name: 'Anthony Davis', position: 'PF', team: 'LAL', age: 28, fgPercent: '53.1%', threePM: 0.8, ftPercent: '79.1%', pts: 22, reb: 9, ast: 3, st: 1.3, blk: 1.8, to: 2 },
    { playerscore: 84, standardscore: 82, image: 'https://fantraximg.com/si/headshots/NBA/hs03e75_96_6.png', dynastyRank: 1, name: 'Nikola Jokic', position: 'C', team: 'DEN', age: 26, fgPercent: '56.6%', threePM: 1.3, ftPercent: '86.8%', pts: 26, reb: 10, ast: 8, st: 1.2, blk: 0.7, to: 3 },
    { playerscore: 83, standardscore: 81, image: 'https://fantraximg.com/si/headshots/NBA/hs03xmv_96_5.png', dynastyRank: 6, name: 'Jayson Tatum', position: 'SF', team: 'BOS', age: 23, fgPercent: '45.9%', threePM: 2.6, ftPercent: '86.8%', pts: 26, reb: 7, ast: 4, st: 1.2, blk: 0.5, to: 2.7 },
    { playerscore: 82, standardscore: 80, image: 'https://fantraximg.com/si/headshots/NBA/hs04ewe_96_5.png', dynastyRank: 15, name: 'Donovan Mitchell', position: 'SG', team: 'UTA', age: 24, fgPercent: '43.8%', threePM: 3.4, ftPercent: '84.5%', pts: 26, reb: 4, ast: 5, st: 1, blk: 0.3, to: 2.8 },
    { playerscore: 81, standardscore: 79, image: 'https://fantraximg.com/si/headshots/NBA/hs03nwm_96_6.png', dynastyRank: 22, name: 'Devin Booker', position: 'SG', team: 'PHX', age: 24, fgPercent: '48.4%', threePM: 2.3, ftPercent: '86.9%', pts: 25, reb: 4, ast: 4, st: 0.8, blk: 0.2, to: 3.2 },
    { playerscore: 80, standardscore: 78, image: 'https://fantraximg.com/si/headshots/NBA/hs027pe_96_6.png', dynastyRank: 65, name: 'Jimmy Butler', position: 'SF', team: 'MIA', age: 31, fgPercent: '49.7%', threePM: 0.5, ftPercent: '86.3%', pts: 21, reb: 6, ast: 7, st: 2, blk: 0.4, to: 2.1 },
    { playerscore: 79, standardscore: 77, image: 'https://fantraximg.com/si/headshots/NBA/hs03lg1_96_6.png', dynastyRank: 68, name: 'Ben Simmons', position: 'PG', team: 'PHI', age: 25, fgPercent: '55.7%', threePM: 0.1, ftPercent: '61.3%', pts: 14, reb: 7, ast: 7, st: 1.6, blk: 0.6, to: 3.5 },
  ];

function RosterBlock({ league, roster }) {

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
                <RosterPlayerRow player={player} index={index}/>
            ))}
        </div>
    );
}

export default RosterBlock;

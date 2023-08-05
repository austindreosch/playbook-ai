import { faDumbbell, faGear, faScaleUnbalancedFlip, faSliders, faWeightHanging, faWeightScale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from 'next/image';

export default function Home() {

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
  
  




  return (


    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                <div className="text-2xl font-bold">Playbook</div>
                
              </a>

            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <header className="bg-gray-50 text-center py-1">
      </header>

      <main className="grid grid-cols-10">

        <div className="col-span-2 bg-white rounded-xl shadow-md overflow-hidden p-4 m-2">
          <h2>League Name</h2>
          <h2>Trade Machine</h2>
          <h2>Update Rosters</h2>
          <h2>Standings</h2>
          <h2>Settings</h2>
        </div>

        <div className="col-span-6 bg-white rounded-xl shadow-md overflow-hidden p-4 m-2">
          <h2 className="text-2xl leading-9 font-bold text-gray-900 mb-4">Your Roster</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-600 text-white text-xs rounded-lg">
              <tr className="">
                <th className="w-1/16 py-2"></th>
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
                  <td className="py-1 px-1 text-center font-bold text-orange-300"><strong>{player.playerscore}</strong></td>
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
                    <FontAwesomeIcon icon={faSliders} className="text-blue-300 text-sm mt-2 p-1" />
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-2 bg-white rounded-xl shadow-md overflow-hidden p-4 m-2">
          <h2>Highlighted Player</h2>
        </div>

      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base leading-6 text-gray-400">
            &copy; {new Date().getFullYear()} Playbook, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>


  )
}

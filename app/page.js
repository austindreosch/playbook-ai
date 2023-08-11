import DetailBlock from "../components/DetailBlock";
import HubBlock from "../components/HubBlock";
import NavBar from "../components/NavBar";
import RosterBlock from "../components/RosterBlock";

// import TestBlock from "../components/test/TestBlock";

import Link from "next/link";


import { Sen } from 'next/font/google';
const oldFont = Sen({
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
})

import { Oxanium } from 'next/font/google';
const logoFont = Oxanium({
  weight: '600',
  subsets: ['latin'],
  display: 'swap',
})


export default async function Home() {
  
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
  
  const response = await fetch('https://api.github.com/repos/vercel/next.js')
  const data = await response.json()


  
  return (


    <div className="min-h-screen bg-gray-200">
      <NavBar />
      
      <header className="bg-gray-200 text-center">
        <HubBlock />
      </header>

      <main className="grid lg:grid-cols-12 gap-y-2 mx-1">
        {/* First RosterBlock */}
        <div className="lg:col-span-5 col-span-full">
          <RosterBlock leagueId="4fzl7g0gljax6594" players={players} roster="My Roster" />
        </div>

        {/* Second RosterBlock */}
        <div className="lg:col-span-5 col-span-full">
          <RosterBlock leagueId="4fzl7g0gljax6594" players={players} roster="Opposing Roster" />
          {/* <TestBlock /> */}
        </div>

        {/* DetailBlock */}
        <div className="lg:col-span-2 col-span-full">
          <DetailBlock />
        </div>
      </main>



      <footer className="bg-white">
        <div className="max-w-8xl mx-auto py-8 px-4 mt-4 sm:px-3 lg:px-5">
          <p className="text-center text-base leading-6 text-gray-400">
            At the moment, all functionality is built around category leagues. Points leagues are much less complex strategically, so alot of this will be less useful - but we will be adding different functionality for points leagues in the future.
          </p>
          <p className="text-center text-base leading-6 text-gray-400">
            &copy; {new Date().getFullYear()} Playbook, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>


  )
}

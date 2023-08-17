import DetailBlock from "../components/DetailBlock";
import HubBlock from "../components/HubBlock";
import NavBar from "../components/NavBar";
import RosterBlock from "../components/RosterBlock";

import TestBlock from "../components/test/TestBlock";

import Link from "next/link";

import FooterBlock from "/components/FooterBlock";


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
  
  
  const response = await fetch('https://api.github.com/repos/vercel/next.js')
  const data = await response.json()


  
  return (


    <div className="min-h-screen bg-gray-200">
      <div className="text-center">
        <HubBlock />
      </div>
      <div className="grid lg:grid-cols-12 gap-y-2 mx-1">
        {/* First RosterBlock */}
        <div className="lg:col-span-5 col-span-full">
          {/* <TestBlock /> */}
        </div>

        {/* Second RosterBlock */}
        <div className="lg:col-span-5 col-span-full">
          {/* <RosterBlock leagueId="4fzl7g0gljax6594" players={players} roster="Opposing Roster" /> */}
          <RosterBlock leagueId="4fzl7g0gljax6594" roster="My Roster" />
        </div>

        {/* DetailBlock */}
        <div className="lg:col-span-2 col-span-full">
          <DetailBlock />
        </div>
      </div>
    </div>


  )
}

'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


import { Oxanium, Sen } from 'next/font/google';
import Link from 'next/link';
import { ThreeCircles } from 'react-loader-spinner';
import DetailBlock from "../components/DetailBlock";
import HubBlock from "../components/HubBlock";
import RosterBlock from "../components/RosterBlock";
import RosterBlockLeague from "../components/RosterBlockLeague";

import { Figtree, Lexend_Deca } from 'next/font/google';
const oldFont = Lexend_Deca({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

import { Bai_Jamjuree, Do_Hyeon, Hammersmith_One, Homenaje, Major_Mono_Display, Titillium_Web } from 'next/font/google';
const logoFont = Titillium_Web({
  weight: '600',
  subsets: ['latin'],
  display: 'swap',
})
const aiFont = Hammersmith_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})





export default function Home() {

  const router = useRouter();
  // const { user, error, isLoading } = useUser();
  const { user, isLoading } = useUser();
  const [hasLeagues, setHasLeagues] = useState(false);
  
  useEffect(() => {
    if (!isLoading && user) {
      fetchLeagues();
    }
  }, [user, isLoading]);

  const fetchLeagues = async () => {
    try {
      const res = await fetch(`/api/load/leagues?userAuthId=${user.sub}&sport=NBA`);
      const leagues = await res.json();
      setHasLeagues(leagues.length > 0);
    } catch (error) {
      console.error('Fetch leagues error:', error);
    }
  };

  if (isLoading || hasLeagues === null) return <div className='flex justify-center content-align my-auto mx-auto pt-48 h-screen'>
      <ThreeCircles
          height="200"
          width="200"
          color="#42a9e0"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
      />
    </div>

  if (!hasLeagues) return <div className='flex justify-center content-align my-auto mx-auto pb-64 h-screen'>
    <div className='p-2 px-4 inline-block bg-myblue text-white rounded-md mx-1 my-auto'>
      <Link className={`${logoFont.className} font-bold`} href="/import">No leagues found. Click here to import a league.</Link>
    </div>

  </div>;


  return (
    user && (
    <div className="min-h-screen bg-gray-200">
      <div className="text-center">
        <HubBlock />
      </div>
      <div className="grid lg:grid-cols-12 gap-y-2 mx-1">
        <div className="lg:col-span-12 col-span-full max-w-[900px] m-auto">
          <RosterBlock />
        </div>

        {/* <div className="lg:col-span-6 col-span-full max-w-[900px] m-auto">
          <RosterBlockLeague />
        </div> */}
      </div>
    </div>
  ));
}

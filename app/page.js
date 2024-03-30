'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


import { Oxanium, Sen } from 'next/font/google';
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
  const { user, isLoading: isLoadingUser } = useUser();
  
  const [hasLeagues, setHasLeagues] = useState(false);
  const [isLoadingLeagues, setIsLoadingLeagues] = useState(true);
  const [loadLeaguesError, setLoadLeaguesError] = useState(null);

  
  useEffect(() => {
    if (!isLoadingUser && user) {
      // Example API call to check for leagues
    
      fetch(`/api/load/leagues?userAuthId=${user.sub}&sport=NBA`)
        .then(response => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error('No leagues found');
            } else {
              throw new Error('Error loading leagues');
            }
          }
          return response.json();
        })
        .then(leagues => {
          if (leagues.length > 0) {
            setHasLeagues(true);
            console.log("HAS LEAGUES");
            console.log("RESPONSE:", response);
          }
          setIsLoadingLeagues(false);
        })
        .catch(error => {
          console.error('Fetch leagues error:', error);
          setLoadLeaguesError(error.message);
          setIsLoadingLeagues(false);
        });
    } else if (!user) {
      router.push('/landing');
    }
  }, [isLoadingUser, user, router]);

  if (isLoadingUser || isLoadingLeagues) {
    return <div className='flex justify-center content-align my-auto mx-auto pt-48 h-screen'>
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
    </div>;
  }

  if (loadLeaguesError) {
    return <div>Error: {loadLeaguesError}</div>;
  }

  if (!hasLeagues) {
    return <div className='flex justify-center items-center h-screen'>
      <p>No leagues found. Please import a league to start.</p>
    </div>;
  }





  // if (isLoadingUser) return <div className='flex justify-center content-align my-auto mx-auto pt-48 h-screen'>
  //     <ThreeCircles
  //         height="200"
  //         width="200"
  //         color="#42a9e0"
  //         wrapperStyle={{}}
  //         wrapperClass=""
  //         visible={true}
  //         ariaLabel="three-circles-rotating"
  //         outerCircleColor=""
  //         innerCircleColor=""
  //         middleCircleColor=""
  //     />
  //   </div>


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

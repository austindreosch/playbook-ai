'use client'

import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import UpdateStatsButton from './UpdateStatsButton';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import Link from 'next/link';

function HubBlock (){
  const { user } = useUser();
  console.log('User: ',user);


  return (
    <div className=" text-myblue bg-gray-50 rounded-md font-bold shadow-sm overflow-hidden mt-2 mx-2 p-4">
      {/* <span className='p-2 px-4 bg-myblue text-white rounded-md mx-1'>League Name</span>
      <span className='p-2 px-4 bg-myblue text-white rounded-md mx-1'>Trade Machine</span>
      <span className='p-2 px-4 bg-myblue text-white rounded-md mx-1'>Standings</span>
      <span className='p-2 px-4 bg-myblue text-white rounded-md mx-1'>Settings</span> */}

      {user ? (
        <div className='inline-block'>
          <div className='p-3 px-4 inline-block bg-myblue text-white rounded-md mx-1'><a href="/import">Import</a></div>
          <div className='inline-block p-3 px-4 bg-myorange text-black rounded-md mx-1 align-middle mb-1'>
            <div className='grid grid-flow-col'>
              {/* <Image  className="h-6 rounded-lg mr-2" src={user.picture} alt="head pic" /> */}
              <img className="h-6 rounded-lg mr-2" src={user.picture} alt="head pic"  />
              <Link className='flex text-center justify-center align-middle' href="/profile">{user.nickname || user.email}</Link>
            </div>
          </div>
          <div className='p-3 px-4 inline-block bg-myorange text-black rounded-md mx-1'>
            <Link href="/api/auth/logout">Logout</Link>
          </div>
          <UpdateStatsButton/>
          {/* <span className='inline-block'>
            <p className='p-3 px-2 font-light text-2xs'><b>auth-id:</b> {user.sub}</p>
          </span> */}
        </div>
      ) : (
        <span className='p-3 px-4 bg-myblue text-white rounded-md mx-1'>
          <Link href="/api/auth/login">Login</Link>
        </span>
      )}




    </div>
  )
}

export default HubBlock;

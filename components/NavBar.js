'use client'
import { useUser } from '@auth0/nextjs-auth0/client';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

import { Figtree, Lexend_Deca } from 'next/font/google';
const oldFont = Lexend_Deca({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

import { Bai_Jamjuree, Do_Hyeon, Hammersmith_One, Homenaje, Inter, Major_Mono_Display, Titillium_Web } from 'next/font/google';
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
const inter = Inter({ subsets: ['latin'], weight: '400', display: 'swap' })



function NavBar (){
  const { user } = useUser();
  console.log('User: ',user);

    return (
        <nav className="bg-myyelloworange shadow-md ">
            <div className="max-w-[83rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 align-content my-auto">

                  
                <div className="flex items-center group font-bold">
                    <a href="/" className="px-3 py-2 flex items-center">
                        <div className={`${logoFont.className} text-3xl font-bold group-hover:text-white`}>
                            playbook 
                            <span className={`${aiFont.className} ml-1 px-1.5 bg-myblue text-white rounded-md text group-hover:text-myblue group-hover:bg-white`}>AI</span>
                        </div>
                    </a>
                        {/* <div className="">
                          <span className={`${oldFont.className} text-sm mt-1`}>fantasy sports toolkit</span>
                        </div> */}
                </div>




                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/landing" className={`text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${inter.className}`}>Home</Link>
                            <Link href="/about" className={`text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${inter.className}`}>Feature Overview</Link>

                            {user ? (
                                <>
                                    <div className='inline-block p-3 px-4 my-auto bg-myblue text-white rounded-md justify-content align-middle'>
                                        <div className='grid grid-flow-col items-center'>
                                            <img className="h-6 rounded-lg mr-2 " src={user.picture} alt="head pic"  />
                                            <Link className={`${inter.className} flex text-center justify-center align-middle tracking-wide`} href="/profile">{user.nickname || user.email}</Link>
                                        </div>
                                    </div>
                                    <div className='p-3 px-1 inline-block text-black rounded-md'>
                                        <Link href="/api/auth/logout"><FontAwesomeIcon icon={faRightFromBracket} /></Link>
                                    </div>




                                </>
                            ) : (
                                <div className='p-3 px-6 bg-myblue text-white font-bold tracking rounded-md mx-1'>
                                    <Link href="/api/auth/login">Login</Link>
                                </div>


                            )}

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;







import Link from 'next/link';
import React from 'react';


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


function NavBar (){

    return (
        <nav className="bg-myyelloworange shadow-md">
        <div className="max-w-[83rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-black hover:text-white px-3 py-2">
                <div className={`${logoFont.className} text-3xl font-bold`}>playbook AI</div>
              </a>
              <span className={`${oldFont.className} text-sm font-bold mt-1`}> fantasy sports toolkit</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/landing" className={`text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${oldFont.className}`}>Home</Link>
                <Link href="/about" className={`text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${oldFont.className}`}>How it Works</Link>
                <Link href="#" className={`text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${oldFont.className}`}>Feature Roadmap</Link>
                {/* <a href="#" className={`text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${oldFont.className}`}>Contact</a> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default NavBar;






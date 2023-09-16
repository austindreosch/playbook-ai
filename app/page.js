'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { Oxanium, Sen } from 'next/font/google';
import DetailBlock from "../components/DetailBlock";
import HubBlock from "../components/HubBlock";
import RosterBlock from "../components/RosterBlock";

const oldFont = Sen({
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
});

const logoFont = Oxanium({
  weight: '600',
  subsets: ['latin'],
  display: 'swap',
});




export default function Home() {

  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/landing');
    }
  }, [isLoading, user, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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
      </div>
    </div>
  ));
}

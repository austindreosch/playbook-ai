import { UserProvider } from '@auth0/nextjs-auth0/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Fira, Fira_Sans, Inter, Libre_Franklin } from 'next/font/google';
import './globals.css';
config.autoAddCss = false


import NavBar from '../components/NavBar';

const inter = Inter({ subsets: ['latin'], weight: '400', display: 'swap' })

export const metadata = {
  title: 'Playbook AI',
  description: 'AI powered fantasy sports toolkit.',
}

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </html>
    </UserProvider>
  )
}

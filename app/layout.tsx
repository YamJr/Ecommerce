'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import { Provider } from 'react-redux'; // Import Redux Provider
import store from '../store/store'; // Import the store

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}> 
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
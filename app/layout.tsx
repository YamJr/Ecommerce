'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
// import { Provider } from 'react-redux'; 
// import store from '../store/store'; 
import { ApolloProvider } from '@apollo/client';
import client from '../components/ApolloClient';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ApolloProvider client={client}>
          {/* <Provider store={store}>  */}
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          {/* </Provider> */}
        </ApolloProvider>
      </body>
    </html>
  );
}

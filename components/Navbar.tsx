'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Dialog from '../components/Dialog'; 

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number; 
}

interface RootState {
  cart: CartItem[];
}

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartCount = useSelector((state: RootState) => state.cart.length);

  const handleCartClick = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <nav className="container grid grid-cols-[auto,1fr,auto] gap-7 text-black py-4 items-center">
        <div className="text-2xl font-black uppercase">
          <Link href="/">Logo</Link>
        </div>
        <ul className="flex gap-12 text-sm font-bold justify-center">
          <li><Link href="/women">Women</Link></li>
          <li><Link href="/men">Men</Link></li>
          <li><Link href="/kid">Kids</Link></li>
        </ul>
        <div className="flex gap-8 pl-6 justify-end items-center">
          <div className="relative">
            <input type="text" placeholder="Search for product" className="rounded-full px-4 py-2 text-sm outline-none pr-9 max-w-[400px] border border-gray-400" />
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-label="Search" className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-black" />
          </div>
          <div className="relative">
            <FontAwesomeIcon 
              icon={faCartShopping} 
              aria-label="Cart" 
              className="size-4 text-gray-600 hover:text-black cursor-pointer"
              onClick={handleCartClick}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <Link href="/account">
            <FontAwesomeIcon icon={faUser} aria-label="Account" className="size-4 text-gray-600 hover:text-black" />
          </Link>
        </div>
      </nav>

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
};

export default Navbar;

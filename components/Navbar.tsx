// import React, { useEffect, useState } from 'react';
// import { useQuery } from '@apollo/client';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
// import Dialog from '../components/Dialog';
// import LoginDialog from '../components/loginDialog';
// import { GET_CATEGORIES } from '../graphql/category';
// import { GET_CART_DETAILS } from '../graphql/getCartItems';

// interface CartItem {
//   id: number;
//   name: string;
//   sku: string;
//   url_key: string;
//   description: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// const Navbar = () => {
//   const [isMounted, setIsMounted] = useState(false);
//   const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
//   const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     setIsMounted(true);

    
//     const token = localStorage.getItem('customerToken');
//     const loginState = localStorage.getItem('isLoggedIn'); 
  
//     if (token && loginState === 'true') {
//       setIsLoggedIn(true); 
//     }
//   }, []);
//   // const cartId = localStorage.getItem('cartId');
//   const { data: cartData } = useQuery(GET_CART_DETAILS);
//   console.log("Cart data is given as ", cartData);
//   const cart = cartData?.cart?.items || [];
//   const totalQuantity = cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
  
//   const handleCartClick = () => setIsCartDialogOpen(true);
//   const handleLoginClick = () => setIsLoginDialogOpen(true);
//   const closeCartDialog = () => setIsCartDialogOpen(false);
//   const closeLoginDialog = () => setIsLoginDialogOpen(false);
//   const cartId = cart?.id;
//     // const cartId = localStorage.getItem('cartId');
//   const { data, loading, error, refetch } = useQuery(GET_CATEGORIES);
  
//   const specificCategories = (categories: any) => {
//     const defaultCategory = categories.find((category: any) => category.name === "Default Category");
//     if (!defaultCategory) return [];
//     return defaultCategory.children.filter((category: any) =>
//       ["women", "men", "gear"].includes(category.url_key)
//     );
//   };

//   const renderCategories = (categories: any) => {
//     return categories.map((category: any) => (
//       <li 
//         key={category.uid} 
//         className='relative group'
//         onMouseEnter={() => setHoveredCategory(category.uid)}
//         onMouseLeave={() => setHoveredCategory(null)}
//       >
//         <Link href={`/category/${category.url_key}`}>
//           {category.name}
//         </Link>
//       </li>
//     ));
//   };

//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     localStorage.setItem('isLoggedIn', 'true'); 
//     setIsLoginDialogOpen(false);
//     refetch();
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem('customerToken');
//     localStorage.removeItem('isLoggedIn'); 
//     localStorage.removeItem('cartId');
//     localStorage.removeItem('tokenExpiration');
//     router.push('/');
//   };

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <>
//       <nav className="container grid grid-cols-[auto,1fr,auto] gap-7 text-black py-4 items-center">
//         <div className="text-2xl font-black uppercase">
//           <Link href="/">Logo</Link>
//         </div>
//         <ul className="flex gap-12 text-sm font-bold justify-center">
//           {loading ? (
//             <li className="loader">Loading...</li>
//           ) : error ? (
//             <li className="text-red-500">Error loading categories. Please try again later.</li>
//           ) : (
//             renderCategories(specificCategories(data.categories.items))
//           )}
//         </ul>
//         <div className="flex gap-8 pl-6 justify-end items-center">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search for product"
//               className="rounded-full px-4 py-2 text-sm outline-none pr-9 max-w-[400px] border border-gray-400"
//             />
//             <FontAwesomeIcon icon={faMagnifyingGlass} aria-label="Search" className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-black" />
//           </div>
//           <div className="relative">
//             <FontAwesomeIcon 
//               icon={faCartShopping} 
//               aria-label="Cart" 
//               className="size-4 text-gray-600 hover:text-black cursor-pointer"
//               onClick={handleCartClick}
//             />
//             {totalQuantity > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
//                 {totalQuantity}
//               </span>
//             )}
//           </div>
//           {isLoggedIn ? (
//             <div className="relative">
//               <FontAwesomeIcon 
//                 icon={faUser} 
//                 className="text-gray-600 cursor-pointer hover:text-black"
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               />
//               {isDropdownOpen && (
//                 <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg z-10">
//                   <ul className="py-2">
//                     <li>
//                       <Link href="/dashboard/order" className="block px-4 py-2 hover:bg-gray-200">
//                         Orders
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/dashboard/wishlist" className="block px-4 py-2 hover:bg-gray-200">
//                         Wishlist
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/dashboard/account" className="block px-4 py-2 hover:bg-gray-200">
//                         Detail
//                       </Link>
//                     </li>
//                     <li>
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 hover:bg-gray-200"
//                       >
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <button 
//               className='capitalize bg-black text-white text-sm py-1 border rounded-full px-3 hover:bg-white hover:text-black hover:border-black' 
//               onClick={handleLoginClick}
//             >
//               Login
//             </button>
//           )}
//         </div>
//       </nav>

//       <Dialog 
//         isOpen={isCartDialogOpen} 
//         onClose={closeCartDialog} 
//         cartId={cartId}
//       />
      
//       <LoginDialog 
//         isOpen={isLoginDialogOpen} 
//         onClose={closeLoginDialog} 
//         onLoginSuccess={handleLoginSuccess} 
//         refetch={refetch}
//       />
//     </>
//   );
// };

// export default Navbar;

import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import Dialog from '../components/Dialog';
import LoginDialog from '../components/loginDialog';
import { GET_CATEGORIES } from '../graphql/category';
import { GET_CART_DETAILS } from '../graphql/getCartItems';
import { searchProductByName } from '../graphql/searchProduct';

interface CartItem {
  id: number;
  name: string;
  sku: string;
  url_key: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [searchResultsVisible, setSearchResultsVisible] = useState(false); 

  const router = useRouter();
  const searchBoxRef = useRef<HTMLDivElement>(null); 
  useEffect(() => {
    setIsMounted(true);
    
    const token = localStorage.getItem('customerToken');
    const loginState = localStorage.getItem('isLoggedIn'); 

    if (token && loginState === 'true') {
      setIsLoggedIn(true); 
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setSearchResultsVisible(false); 
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { data: cartData } = useQuery(GET_CART_DETAILS);
  // console.log("cart data is listed below",cartData);
 const cart = cartData?.cart?.items || [];
  const totalQuantity = cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);

  const { data, loading, error, refetch } = useQuery(GET_CATEGORIES);

  const { data: searchData, refetch: searchRefetch } = useQuery(searchProductByName, {
    variables: { name: searchTerm },
    skip: !searchTerm, 
  });

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      setSearchResultsVisible(true); 
      searchRefetch(); 
    } else {
      setSearchResultsVisible(false); 
    }
  };

  const handleSearchIconClick = () => {
    if (searchTerm) {
      setSearchResultsVisible(true); 
      searchRefetch(); 
    }
  };

  const handleCartClick = () => setIsCartDialogOpen(true);
  const handleLoginClick = () => setIsLoginDialogOpen(true);
  const closeCartDialog = () => setIsCartDialogOpen(false);
  const closeLoginDialog = () => setIsLoginDialogOpen(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoginDialogOpen(false);
    refetch();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('customerToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('cartId');
    localStorage.removeItem('tokenExpiration');
    router.push('/');
  };

  const specificCategories = (categories: any) => {
    const defaultCategory = categories.find((category: any) => category.name === "Default Category");
    if (!defaultCategory) return [];
    return defaultCategory.children.filter((category: any) =>
      ["women", "men", "gear"].includes(category.url_key)
    );
  };

  const renderCategories = (categories: any) => {
    return categories.map((category: any) => (
      <li 
        key={category.uid} 
        className='relative group'
        onMouseEnter={() => setHoveredCategory(category.uid)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <Link href={`/category/${category.url_key}`}>
          {category.name}
        </Link>
      </li>
    ));
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
          {loading ? (
            <li className="loader">Loading...</li>
          ) : error ? (
            <li className="text-red-500">Error loading categories. Please try again later.</li>
          ) : (
            renderCategories(specificCategories(data.categories.items))
          )}
        </ul>
        <div className="flex gap-8 pl-6 justify-end items-center">
          <div className="relative" ref={searchBoxRef}>
            <input
              type="text"
              placeholder="Search for product"
              value={searchTerm}
              onChange={handleSearchInputChange} 
              className="rounded-full px-4 py-2 text-sm outline-none pr-9 max-w-[400px] border border-gray-400"
            />
            <FontAwesomeIcon 
              icon={faMagnifyingGlass} 
              aria-label="Search" 
              onClick={handleSearchIconClick} 
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-black cursor-pointer" 
            />
            {searchResultsVisible && searchData && (
              <div className="absolute bg-white shadow-lg rounded-lg w-full mt-1 z-10">
                {searchData.products.items.length > 0 ? (
                  searchData.products.items.map((product: any) => (
                    <div key={product.id} className="p-2 border-b">
                      <Link href={`/products/${product.url_key}`}>
                        {product.name}
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="p-2">No products found</div>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <FontAwesomeIcon 
              icon={faCartShopping} 
              aria-label="Cart" 
              className="size-4 text-gray-600 hover:text-black cursor-pointer"
              onClick={handleCartClick}
            />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <div className="relative">
              <FontAwesomeIcon 
                icon={faUser} 
                className="text-gray-600 cursor-pointer hover:text-black"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg z-10">
                  <ul className="py-2">
                    <li>
                      <Link href="/dashboard/order" className="block px-4 py-2 hover:bg-gray-200">
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/wishlist" className="block px-4 py-2 hover:bg-gray-200">
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/account" className="block px-4 py-2 hover:bg-gray-200">
                        Detail
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button 
              className='capitalize bg-black text-white px-4 py-2 text-sm rounded-full font-semibold'
              onClick={handleLoginClick}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      <Dialog 
        isOpen={isCartDialogOpen} 
        onClose={closeCartDialog} 
        // cartId={cart?.id}
      />
      
      <LoginDialog 
        isOpen={isLoginDialogOpen} 
        onClose={closeLoginDialog} 
        onLoginSuccess={handleLoginSuccess} 
        refetch={refetch}
      />
    </>
  );
};

export default Navbar;

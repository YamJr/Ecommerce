// // components/Breadcrumb.tsx

// import Link from 'next/link';

// interface BreadcrumbItem {
//   label: string;
//   href: string;
// }

// interface BreadcrumbProps {
//   items: BreadcrumbItem[];
// }

// const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
//   return (
//     <nav aria-label="breadcrumb">
//       <ol className="flex space-x-2 text-gray-700">
//         {items.map((item, index) => (
//           <li key={item.href} className="flex items-center">
//             <Link 
//               href={item.href} 
//               className="text-blue-600 hover:underline"
//               aria-current={index === items.length - 1 ? "page" : undefined}
//             >
//               {item.label}
//             </Link>
//             {index < items.length - 1 && (
//               <svg
//                 className="mx-2 w-4 h-4 text-gray-400"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M6.293 9.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             )}
//           </li>
//         ))}
//       </ol>
//     </nav>
//   );
// };

// export default Breadcrumb;

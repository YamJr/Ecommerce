import Link from 'next/link';
import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6">
        <h1 className="text-xl font-semibold mb-6">Customer Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <nav className="bg-white shadow-lg rounded-lg p-4">
            <ul className="space-y-4">
              <li>
                <Link href="#" className="block text-blue-600">Orders</Link>
                </li>
                <li>
                <Link href="#" className="block text-blue-600">Account Details</Link>
                </li>
                <li>
                <Link href="#" className="block text-blue-600">Wishlist</Link>
                </li>
            </ul>
          </nav>

          <div className="col-span-3 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-600">Welcome to your dashboard! Here you can manage your orders, account, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

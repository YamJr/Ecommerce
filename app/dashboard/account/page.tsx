'use client';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CUSTOMER_INFO, UPDATE_CUSTOMER_INFO } from '../../../graphql/customer';

const CustomerAccountDetail: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMER_INFO);
  const [updateCustomer, { loading: updating, error: updateError }] = useMutation(UPDATE_CUSTOMER_INFO);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState(''); 
  const [isEditing, setIsEditing] = useState(false); 
  useEffect(() => {
    if (data) {
      const customer = data.customer;
      setFirstname(customer.firstname);
      setLastname(customer.lastname);
      setEmail(customer.email);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: updateData } = await updateCustomer({
        variables: { input: { 
          firstname, 
          lastname, 
          email, 
          currentPassword,  
          newPassword        
        } },
      });
      const updatedCustomer = updateData.updateCustomer.customer;
      setFirstname(updatedCustomer.firstname);
      setLastname(updatedCustomer.lastname);
      setEmail(updatedCustomer.email);
      setCurrentPassword(''); 
      setNewPassword(''); 
      alert("Customer information updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating customer info:", err);
    }
  };

  if (loading) return <p>Loading customer information...</p>;
  if (error) return <p>Error fetching customer information: {error.message}</p>;

  const customer = data?.customer;

  return (
    <div className='container'>
      <h2 className="text-2xl font-bold my-4 ">Customer Account Details</h2>
      {customer ? (
        <div className="mb-4 pt-4">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className='pb-3 '>
                <label>
                  First Name:
                  <input 
                    type="text" 
                    value={firstname} 
                    onChange={(e) => setFirstname(e.target.value)} 
                    className="border rounded p-1"
                    required 
                  />
                </label>
              </div>
              <div className='pb-3 '>
                <label>
                  Last Name:
                  <input 
                    type="text" 
                    value={lastname} 
                    onChange={(e) => setLastname(e.target.value)} 
                    className="border rounded p-1"
                    required 
                  />
                </label>
              </div>
              <div className='pb-3 '>
                <label>
                  Email:
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="border rounded p-1"
                    required 
                  />
                </label>
              </div>
              <div className='pb-3 '>
                <label>
                  Current Password:
                  <input 
                    type="password" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                    className="border rounded p-1"
                    required 
                  />
                </label>
              </div>
              <div className='pb-3 '>
                <label>
                  New Password:
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="border rounded p-1"
                    required 
                  />
                </label>
              </div>
              <button 
                type="submit" 
                className="mt-4 bg-red-500 text-sm text-white rounded py-2 px-4"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
              {updateError && <p className="text-red-500">Error updating information: {updateError.message}</p>}
            </form>
          ) : (
            <>
              <p className='mb-2'><strong>First Name:</strong> {customer.firstname}</p>
              <p className='mb-2'><strong>Last Name:</strong> {customer.lastname}</p>
              <p className='mb-2'><strong>Email:</strong> {customer.email}</p>
              <p className="text-red-500 cursor-pointer text-sm" onClick={() => setIsEditing(true)}>Edit</p> 
            </>
          )}
        </div>
      ) : (
        <p>No customer information found.</p>
      )}
    </div>
  );
};

export default CustomerAccountDetail;

'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MEN_CATEGORY_PRODUCTS } from '../../../graphql/men';
import ProductList from '../../../components/Product'; 

const MenPage = () => {
  const { data, loading, error } = useQuery(GET_MEN_CATEGORY_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.categoryList[0].products.items;

  return (
    <div className='container'>
      <ProductList products={products} />
    </div>
  );
};

export default MenPage;

'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_WOMEN_CATEGORY_PRODUCTS } from '../../../graphql/women';
import ProductList from '../../../components/Product'; 

const WomenPage = () => {
  const { data, loading, error } = useQuery(GET_WOMEN_CATEGORY_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.categoryList[0].products.items;

  return (
    <div className='container flex flex-col justify-center text-center'>
      <h1>Women's Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default WomenPage;

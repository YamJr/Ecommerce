'use client';
import React from 'react'

const HeroSection = () => {
  return (
    <>
    <div className='container flex'>
        <div className='w-2/4 text-left'>
        <h1 className='text-5xl font-semibold max-w-sm mt-10 text-black'>Step into the Future of Footwear</h1>
        <p className='max-w-sm text-black'>Discover the latest trends in men's and women's sneakers.</p>
        <button className='capitalize border bg-black text-white p-2 mt-2 hover:bg-white hover:text-black hover:border-black rounded-full px-4'  onClick={() =>console.log('Clicked me')}>shop now</button>
        </div>
        <div className='w-2/4'>
        <img src='/images/shoes.png' alt='shoes' className='rotate-[30deg] mt-9 w-[450px]'/>
            </div>
    </div>

    <div className='container flex mt-14 justify-center'>
      <h2 className='uppercase w-auto size-7  border-b-2 border-black font-semibold text-black'>new arrival</h2>
    </div>
    </>
  )
}

export default HeroSection
import React from 'react'


const Footer = () => {
  return (
    <div className='container text-black flex gap-10 mt-16 mb-4'>
        <div className='capitalize'>
          <h2 className='font-bold'>quick contact</h2>
          <ul>
            <li>123, demo street, city, state country</li>
            <li>info@domain.com</li>
            <li>+1 123 456 7890</li>
          </ul>
        </div> 
        <div className='capitalize'>
          <h2 className='font-bold'>quick links</h2>
          <ul>
            <li>about us</li>
            <li>FAQ</li>
            <li>privacy policy</li>
          </ul>
        </div>   
    </div>
  )
}

export default Footer
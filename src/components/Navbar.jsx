import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-white text-blue-800 py-5'>
      <div className="logo"><span className='font-bold text-blue-800 text-2xl mx-8'>E-Planner</span></div>
        <ul className='flex gap-8 mx-9'>
          <li className='cursor-pointer hover:font-bold transition-all duration-40 text-lg '>Home</li>
          <li className='cursor-pointer hover:font-bold transition-all duration-40 text-lg'>Your Tasks</li>
          
          
        </ul>
    </nav>
  )
      
}

export default Navbar

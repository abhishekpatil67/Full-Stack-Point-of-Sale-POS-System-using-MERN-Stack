import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'

const ShoppingLayout = () => {
  return (
 <div className='flex flex-col bg-white overflow-auto'>

  <ShoppingHeader/>
  <main className='flex flex-col w-full'></main>
  <Outlet/>
 </div>
  )
}

export default ShoppingLayout
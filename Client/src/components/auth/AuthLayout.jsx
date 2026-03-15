import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        
        <div className='min-h-screen bg-[F5F5F5] flex items-center justify-center'>

            <div className='w-[80vw] rounded-md min-h-[80vh] justify-between text-black border shadow shadow-[#118AB2] flex'>
                <div className="w-1/2 hidden lg:block bg-[url('/src/assets/authsideimage.png')] py-6 bg-center bg-cover">
                </div>
                <Outlet />
            </div>

        </div>

    )
}

export default AuthLayout
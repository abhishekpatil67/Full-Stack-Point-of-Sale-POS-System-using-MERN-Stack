import Form from '@/components/common/Form'
import { loginControls } from '@/config/config'
// import { loginControls } from '@/config/config'
import { loginUser } from '@/store/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import logo from "../../assets/logo.png"


const initialFormData = { email: "", password: "" }

const Login = () => {

  const dispatch = useDispatch()

  const [formData, setformData] = useState(initialFormData)


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
  }

  return (
    <>
      <div className='flex flex-col text-center items-center bg-muted lg:w-1/2 w-full py-6 gap-8'>

        <div className="text-center justify-center items-center pt-8 flex gap-2 flex-col">
          <div>
            <img
              src={logo}
              alt="AbhiPOS Logo"
              className="h-10 md:h-14 w-auto object-contain"
            />
          </div>
          {/* <h1 className='text-3xl font-bold'>Welcome To <span className="text-[#102A5C]">Abhi</span><span className="text-[#54B948]">POS</span></h1> */}
          <p className='text-[14px]'>An Platform Facilitating Business Billings And Inventory Management.
          </p>
        </div>

        <div><h2 className='font-medium'>Login</h2></div>

        <Form formControls={loginControls} handleSubmit={handleSubmit} buttonText={"login"} formData={formData} setFormData={setformData} />
        <div>
          <p><a href="/auth/forgot-password"><span className='text-blue-700 hover:underline mb-2'>Forgot Password ?</span></a></p>
          <p>Don't have an account?</p>
          <p><a href="/auth/register"><span className='text-blue-700 hover:underline'>Sign Up</span></a></p>
        </div>
      </div>
    </>

  )

}

export default Login
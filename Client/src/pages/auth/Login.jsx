import Form from '@/components/common/Form'
import { loginControls } from '@/config/config'
// import { loginControls } from '@/config/config'
import { loginUser } from '@/store/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'


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
      <div className='flex flex-col text-center items-center bg-muted w-1/2 py-6 gap-8'>

        <div className="text-center pt-8 flex gap-2 flex-col">
          <h1 className='text-3xl font-bold'>Welcome To Shopify</h1>
          <p className='text-xs'>An Amazing Place To Find Desired Products.
          </p>
        </div>

        <div><h2 className='font-medium'>Login</h2></div>

        <Form formControls={loginControls} handleSubmit={handleSubmit} buttonText={"login"} formData={formData} setFormData={setformData} />
        <div>
          <p>Don't have an account?</p>
          <p><a href="/auth/register"><span className='text-blue-700 hover:underline'>Sign Up</span></a></p>
        </div>
      </div>
    </>

  )

}

export default Login
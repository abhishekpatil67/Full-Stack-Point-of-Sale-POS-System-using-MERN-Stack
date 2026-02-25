import Form from '@/components/common/Form'
import { registersControls } from '@/config/config'
import { registerUser } from '@/store/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const initialFormData = {
  userName: "",
  email: "",
  password: "",
}

const Register = () => {

  const [formData, setformData] = useState(initialFormData)
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {


    e.preventDefault();
    console.log(formData)
    dispatch(registerUser(formData)).then((data) => {
      if (data.payload.success) {
        setformData(initialFormData)
        toast(data.payload.message, {
          action: {
            label: "Ok"
          }
        })
      }
    })

  }

  return (
    <>
      <div className='flex flex-col text-center items-center bg-muted w-1/2 py-6 gap-8'>


        <div className="text-center pt-8 flex gap-2 flex-col">
          <h1 className='text-3xl font-bold'>Welcome To Shopify</h1>
          <p className='text-xs'>An Amazing Place To Find Desired Products.
          </p>
        </div>

        <div><h2 className='font-medium'>Register</h2></div>

        <Form formControls={registersControls} handleSubmit={handleSubmit} buttonText={"Sign Up"} formData={formData} setFormData={setformData} />
        <div>

          <p>Already have an account?</p>
          <p><a href="/auth/login"><span className='text-blue-700 hover:underline'>Sign In</span></a></p>

        </div>
      </div>
    </>

  )

}

export default Register
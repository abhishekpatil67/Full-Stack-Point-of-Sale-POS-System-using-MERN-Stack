import Form from '@/components/common/Form'
import { registersControls } from '@/config/config'
import { registerUser } from '@/store/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import logo from "../../assets/logo.png"

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
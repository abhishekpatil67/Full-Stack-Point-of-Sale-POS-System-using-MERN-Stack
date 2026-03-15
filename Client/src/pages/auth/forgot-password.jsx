import { forgotPasswordControls } from "@/config/config"
import { Fragment, useState } from "react"
import Form from "@/components/common/Form"
import { useDispatch } from "react-redux"
import { forgotPasswordThunk } from "@/store/authSlice"
import { toast } from "sonner"
import logo from '../../assets/logo.png'
const initialFormData = {
    email: ""
}


function ForgotPassword() {

    const [formData, setformData] = useState(initialFormData)
    const dispatch = useDispatch()


    const handleForgotPassword = (e) => {
        e.preventDefault();
        console.log("clicked : ", formData)
        dispatch(forgotPasswordThunk(formData)).then((data) => {
            console.log(data)
            toast(data.payload.message, {
                action: {
                    label: "Ok",
                }
            })
        })
    }

    return (<Fragment>

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

            <div><h2 className='font-medium'>Forgot Password</h2></div>

            <Form formControls={forgotPasswordControls} handleSubmit={handleForgotPassword} buttonText={"Next"} formData={formData} setFormData={setformData} />
            <div>

                <p>Go Back To Login ?</p>
                <p><a href="/auth/login"><span className='text-blue-700 hover:underline'>Login</span></a></p>
            </div>

        </div>

    </Fragment>)

}

export default ForgotPassword
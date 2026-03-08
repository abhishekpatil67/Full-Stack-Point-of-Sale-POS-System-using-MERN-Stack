import { resetPasswordControls } from "@/config/config"
import { Fragment, useState } from "react"
import Form from "@/components/common/Form"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { useNavigate, useSearchParams } from "react-router-dom"
import { resetPasswordThunk } from "@/store/authSlice"
import { Button } from "@/components/ui/button"

const initialFormData = {
    password : "",
    confirmPassword : ""
}


function ResetPassword() {

    const [formData, setformData] = useState(initialFormData)
    const [isReseted, setIsReseted] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();


    const handleResetPassword = (e) => {
        e.preventDefault();
        console.log("clicked : ", formData)

        if(formData.password!==formData.confirmPassword)
        {
             toast("password Does not match",{
                action: {
                    label: "Ok",
                }
            })
        }
        else
        {

            const token = searchParams.get("token")
            
              dispatch(resetPasswordThunk({password : formData.password,token})).then((data) => {
            console.log(data)
            if(data.payload.success)
            {
                setIsReseted(true)
            }
            toast(data.payload.message, {
                action: {
                    label: "Ok",
                }
            })
        })
        }
      
    }

    return (<Fragment>

        <div className='flex flex-col text-center items-center bg-muted lg:w-1/2 w-full py-6 gap-8'>

            <div className="text-center pt-8 flex gap-2 flex-col">
                <h1 className='text-3xl font-bold'>Welcome To Shopify</h1>
                <p className='text-xs'>An Amazing Place To Find Desired Products.
                </p>
            </div>

            <div><h2 className='font-medium'>{!isReseted ? "Reset Password" : "Password Successfully Reseted"}</h2></div>


            {!isReseted ? <Fragment>  <Form formControls={resetPasswordControls} handleSubmit={handleResetPassword} buttonText={"Next"} formData={formData} setFormData={setformData} />
            <div>

                <p>Go Back To Login ?</p>
                <p><a href="/auth/login"><span className='text-blue-700 hover:underline'>Login</span></a></p>
            </div>
            </Fragment>
            : <Button onClick={()=>navigate("/auth/login")}>Go To Login</Button>}
        </div>

    </Fragment>)

}

export default ResetPassword
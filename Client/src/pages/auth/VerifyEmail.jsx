
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'


const VerifyEmail = () => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    const [verificationMessage, setverificationMessage] = useState("Verifying Your Email. Please Wait")
    const [isVerified, setisVerified] = useState(false)

    async function CheckToken() {

        try {

            const token = searchParams.get("token")
            const response = await axios.post(`http://localhost:5000/auth/verify-email?token=${token}`, {}, {
                withCredentials: true
            }
            )

            console.log(response)
            setverificationMessage(response.data.message);
            setisVerified(true)

        } catch (error) {

            setverificationMessage(error.response.data.message)

        }



    }
    useEffect(() => {
        CheckToken()
    }, [])



    return (
        <>
            <div className='flex flex-col  text-center  items-center lg:w-1/2 w-full p-6 gap-8'>


                <div className="text-center pt-8 flex gap-2 flex-col">
                    <h1 className='text-3xl font-bold'>Welcome To Shopify</h1>
                    <p className='text-xs'>An Amazing Place To Find Desired Products.
                    </p>
                </div>

                <div><h2 className='font-medium text-center'>Verify Email</h2></div>
                <div className='h-[30%] flex-col items-center justify-center'><h2 className='font-medium text-center'>{verificationMessage}</h2></div>

                {
                    isVerified ?
                        <Button
                            onClick={() => navigate("/auth/login")}
                            className="w-full cursor-pointer bg-blue-700 transition-colors hover:bg-blue-900 flex justify-center items-center mx-auto gap-2 pt-2 p-2">Login</Button>
                        : <Button
                            onClick={() => navigate("/auth/register")}
                            className="w-full cursor-pointer bg-blue-700 transition-colors hover:bg-blue-900 flex justify-center items-center mx-auto gap-2 pt-2 p-2">Try Again</Button>
                }
            </div>
        </>
    )
}

export default VerifyEmail
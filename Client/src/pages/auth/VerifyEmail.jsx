
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
            <div className='flex flex-col bg-[#FFBDEC] text-center  items-center w-1/2 p-6 gap-8'>


                <div className="text-center pt-8 flex gap-2 flex-col">
                    <h1 className='text-3xl font-bold'>Welcome To Shopify</h1>
                    <p className='text-xs'>An Amazing Place To Find Desired Products.
                    </p>
                </div>

                <div><h2 className='font-medium text-center'>Verify Email</h2></div>
                <div><h2 className='font-medium text-center'>{verificationMessage}</h2></div>

                {
                    isVerified ?
                        <button
                            onClick={() => navigate("/auth/login")}
                            className='bg-[#118AB2] disabled:bg-[#19596e] px-2 py-1 rounded-sm cursor-pointer border border-[#03141a]'>Login</button>
                        : <button
                            onClick={() => navigate("/auth/register")}
                            className='bg-[#118AB2] disabled:bg-[#19596e] px-2 py-1 rounded-sm cursor-pointer border border-[#03141a]'>Try Again</button>
                }
            </div>
        </>
    )
}

export default VerifyEmail